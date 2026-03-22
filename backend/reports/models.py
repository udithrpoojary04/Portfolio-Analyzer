from django.db import models
from django.conf import settings
from github_analyzer.models import GitHubProfile

class AnalysisReport(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reports')
    github_profile = models.ForeignKey(GitHubProfile, on_delete=models.CASCADE, related_name='reports')
    
    # Core Analysis Data
    overall_score = models.IntegerField(default=0) # 0-100
    technical_skills = models.JSONField(default=dict) # { 'Python': 80, 'JS': 60 }
    skill_gaps = models.JSONField(default=list) # List of skills to learn
    project_recommendations = models.JSONField(default=list) # Suggested projects
    resume_feedback = models.JSONField(default=list) # Tips for resume
    
    # Metadata
    summary = models.TextField(blank=True, null=True)
    raw_ai_response = models.TextField(blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=[
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed')
    ], default='PENDING')
    
    error_message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Report for {self.user.username} - {self.created_at.strftime('%Y-%m-%d')}"
