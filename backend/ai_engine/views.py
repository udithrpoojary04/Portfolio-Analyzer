from rest_framework import views, response, permissions, status
from github_analyzer.models import GitHubProfile
from reports.models import AnalysisReport
from .tasks import run_portfolio_analysis

class StartAnalysisView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            profile = GitHubProfile.objects.get(user=request.user)
        except GitHubProfile.DoesNotExist:
            return response.Response(
                {"error": "GitHub profile not found. Please sync your GitHub profile first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create a pending report
        report = AnalysisReport.objects.create(
            user=request.user,
            github_profile=profile,
            status='PENDING'
        )

        # Trigger background task
        # Using .delay() for Celery, fallback to synchronous if needed for dev?
        # For now, assuming Celery is set up.
        run_portfolio_analysis.delay(report.id)

        return response.Response({
            "message": "Analysis started in background.",
            "report_id": report.id
        }, status=status.HTTP_202_ACCEPTED)
