from django.urls import path
from .views import StartAnalysisView

urlpatterns = [
    path('analyze/', StartAnalysisView.as_view(), name='start-analysis'),
]
