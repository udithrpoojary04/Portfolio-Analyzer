from django.urls import path
from .views import AdminStatsView, AdminUserListView, AdminReportListView

urlpatterns = [
    path('stats/', AdminStatsView.as_view(), name='admin_stats'),
    path('users/', AdminUserListView.as_view(), name='admin_users'),
    path('reports/', AdminReportListView.as_view(), name='admin_reports'),
]
