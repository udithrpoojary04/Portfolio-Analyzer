from rest_framework import serializers
from django.contrib.auth import get_user_model
from reports.models import AnalysisReport

User = get_user_model()

class AdminUserSerializer(serializers.ModelSerializer):
    report_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'github_username', 'avatar_url', 'is_staff', 'date_joined', 'report_count')

class AdminReportSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    github_username = serializers.CharField(source='github_profile.username', read_only=True)

    class Meta:
        model = AnalysisReport
        fields = ('id', 'username', 'github_username', 'overall_score', 'status', 'created_at', 'updated_at')
