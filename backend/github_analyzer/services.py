import requests
from django.conf import settings
from .models import GitHubProfile, Repository

class GitHubService:
    BASE_URL = "https://api.github.com"
    
    def __init__(self, token=None):
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
        }
        if token:
            self.headers["Authorization"] = f"token {token}"
        elif getattr(settings, 'GITHUB_TOKEN', None):
            self.headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"

    def fetch_user_data(self, username):
        url = f"{self.BASE_URL}/users/{username}"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json()
        return None

    def fetch_user_repos(self, username):
        repos = []
        page = 1
        while True:
            url = f"{self.BASE_URL}/users/{username}/repos"
            params = {"per_page": 100, "page": page, "sort": "pushed"}
            response = requests.get(url, headers=self.headers, params=params)
            if response.status_code != 200:
                break
            
            data = response.json()
            if not data:
                break
                
            repos.extend(data)
            page += 1
            
        return repos

    def sync_profile(self, user, username=None):
        github_username = username or user.github_username
        if not github_username:
            return None, "No GitHub username provided."

        user_data = self.fetch_user_data(github_username)
        if not user_data:
            return None, "GitHub profile not found."

        # Save username to user if it's new
        if username and user.github_username != username:
            user.github_username = username
            user.save()

        profile, created = GitHubProfile.objects.update_or_create(
            user=user,
            defaults={
                'username': user_data.get('login'),
                'avatar_url': user_data.get('avatar_url'),
                'bio': user_data.get('bio'),
                'blog': user_data.get('blog'),
                'location': user_data.get('location'),
                'public_repos': user_data.get('public_repos', 0),
                'public_gists': user_data.get('public_gists', 0),
                'followers': user_data.get('followers', 0),
                'following': user_data.get('following', 0),
                'created_at_github': user_data.get('created_at'),
                'updated_at_github': user_data.get('updated_at'),
            }
        )

        # Sync Repositories
        repos_data = self.fetch_user_repos(github_username)
        
        # Clear old repos or update? For simplicity, we'll update or create.
        for r in repos_data:
            Repository.objects.update_or_create(
                profile=profile,
                full_name=r.get('full_name'),
                defaults={
                    'name': r.get('name'),
                    'html_url': r.get('html_url'),
                    'description': r.get('description'),
                    'is_fork': r.get('fork', False),
                    'language': r.get('language'),
                    'stargazers_count': r.get('stargazers_count', 0),
                    'watchers_count': r.get('watchers_count', 0),
                    'forks_count': r.get('forks_count', 0),
                    'size': r.get('size', 0),
                    'topics': r.get('topics', []),
                    'created_at_github': r.get('created_at'),
                    'updated_at_github': r.get('updated_at'),
                    'pushed_at_github': r.get('pushed_at'),
                }
            )

        return profile, None
