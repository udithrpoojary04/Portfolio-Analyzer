from django.urls import path
from .views import GitHubSyncView

urlpatterns = [
    path('sync/', GitHubSyncView.as_view(), name='github-sync'),
]
