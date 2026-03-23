from rest_framework import generics, permissions, views
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Count
from reports.models import AnalysisReport
from .serializers import AdminUserSerializer, AdminReportSerializer

User = get_user_model()

class AdminStatsView(views.APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        total_users = User.objects.count()
        total_reports = AnalysisReport.objects.count()
        completed_reports = AnalysisReport.objects.filter(status='COMPLETED').count()
        failed_reports = AnalysisReport.objects.filter(status='FAILED').count()
        pending_reports = AnalysisReport.objects.filter(status='PENDING').count()
        processing_reports = AnalysisReport.objects.filter(status='PROCESSING').count()

        return Response({
            'total_users': total_users,
            'total_reports': total_reports,
            'completed_reports': completed_reports,
            'failed_reports': failed_reports,
            'pending_reports': pending_reports,
            'processing_reports': processing_reports,
        })

class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.annotate(report_count=Count('reports')).order_by('-date_joined')
    serializer_class = AdminUserSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminReportListView(generics.ListAPIView):
    queryset = AnalysisReport.objects.all().order_by('-created_at')
    serializer_class = AdminReportSerializer
    permission_classes = [permissions.IsAdminUser]
