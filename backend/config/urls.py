from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/users/', include('users.urls')),
    path('api/github/', include('github_analyzer.urls')),
    path('api/ai/', include('ai_engine.urls')),
    path('api/reports/', include('reports.urls')),
]
