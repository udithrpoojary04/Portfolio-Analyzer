from django.db import models
from django.conf import settings

class GitHubProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='github_profile')
    username = models.CharField(max_length=255)
    avatar_url = models.URLField(max_length=500, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    blog = models.URLField(max_length=500, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    public_repos = models.IntegerField(default=0)
    public_gists = models.IntegerField(default=0)
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)
    created_at_github = models.DateTimeField(null=True, blank=True)
    updated_at_github = models.DateTimeField(null=True, blank=True)
    last_synced = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username}'s Profile"

class Repository(models.Model):
    profile = models.ForeignKey(GitHubProfile, on_delete=models.CASCADE, related_name='repositories')
    name = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    html_url = models.URLField(max_length=500)
    description = models.TextField(blank=True, null=True)
    is_fork = models.BooleanField(default=False)
    language = models.CharField(max_length=100, blank=True, null=True)
    stargazers_count = models.IntegerField(default=0)
    watchers_count = models.IntegerField(default=0)
    forks_count = models.IntegerField(default=0)
    size = models.IntegerField(default=0) # KB
    topics = models.JSONField(default=list, blank=True)
    created_at_github = models.DateTimeField(null=True, blank=True)
    updated_at_github = models.DateTimeField(null=True, blank=True)
    pushed_at_github = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "Repositories"

    def __str__(self):
        return self.full_name
