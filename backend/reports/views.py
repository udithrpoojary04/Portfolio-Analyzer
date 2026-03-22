from rest_framework import generics, permissions
from .models import AnalysisReport
from .serializers import AnalysisReportSerializer

class ReportListView(generics.ListAPIView):
    serializer_class = AnalysisReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AnalysisReport.objects.filter(user=self.request.user).order_by('-created_at')

class ReportDetailView(generics.RetrieveAPIView):
    serializer_class = AnalysisReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AnalysisReport.objects.filter(user=self.request.user)
