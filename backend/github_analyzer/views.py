from rest_framework import views, response, permissions, status
from .services import GitHubService
from .serializers import GitHubProfileSerializer

class GitHubSyncView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        username = request.data.get('github_username') or request.user.github_username
        if not username:
            return response.Response(
                {"error": "GitHub username is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        service = GitHubService()
        profile, error = service.sync_profile(request.user, username)
        
        if error:
            return response.Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
            
        serializer = GitHubProfileSerializer(profile)
        return response.Response(serializer.data)
