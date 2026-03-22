from celery import shared_task
from reports.models import AnalysisReport
from github_analyzer.models import GitHubProfile, Repository
from .services import GroqService
import logging

logger = logging.getLogger(__name__)

@shared_task
def run_portfolio_analysis(report_id):
    try:
        report = AnalysisReport.objects.get(id=report_id)
        report.status = 'PROCESSING'
        report.save()

        profile = report.github_profile
        repos = Repository.objects.filter(profile=profile)

        service = GroqService()
        ai_data, error = service.analyze_portfolio(profile, repos)

        if error:
            report.status = 'FAILED'
            report.error_message = error
            report.save()
            return

        # Update report with AI data
        report.overall_score = ai_data.get('overall_score', 0)
        report.technical_skills = ai_data.get('technical_skills', {})
        report.skill_gaps = ai_data.get('skill_gaps', [])
        report.project_recommendations = ai_data.get('project_recommendations', [])
        report.resume_feedback = ai_data.get('resume_feedback', [])
        report.summary = ai_data.get('summary', '')
        report.raw_ai_response = str(ai_data)
        
        report.status = 'COMPLETED'
        report.save()

    except AnalysisReport.DoesNotExist:
        logger.error(f"Report {report_id} not found.")
    except Exception as e:
        logger.exception(f"Error in analysis task: {str(e)}")
        if 'report' in locals():
            report.status = 'FAILED'
            report.error_message = str(e)
            report.save()
