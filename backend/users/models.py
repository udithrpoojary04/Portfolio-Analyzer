from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    github_username = models.CharField(max_length=255, blank=True, null=True)
    avatar_url = models.URLField(max_length=500, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    
    # Track when the user last refreshed their GitHub data
    last_github_sync = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.username
