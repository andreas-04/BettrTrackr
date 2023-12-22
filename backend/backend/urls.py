"""
This is the main URL configuration file for the Django project. 
It includes the URLs of the admin site and the APIs for habit tracking and user management.
"""

# Import the admin module from django.contrib
from django.contrib import admin
# Import the path and include functions from django.urls
from django.urls import path, include

# Define the URL patterns for this Django project
urlpatterns = [
    # Map the URL 'admin/' to the admin site
    path('admin/', admin.site.urls),
    # Include the URLs from the 'habitTracker' app under the 'api/' path
    path('api/', include('habitTracker.urls')),
    # Include the URLs from the 'users' app under the 'user_api/' path
    path('user_api/', include('users.urls')),
]