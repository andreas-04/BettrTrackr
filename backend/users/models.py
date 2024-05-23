"""
This file defines the CustomUser model and its manager for the Django application.

The CustomUser model is a subclass of the AbstractBaseUser class provided by Django, 
which allows for customization of the User model. 

The CustomUserManager class is a subclass of the BaseUserManager class provided by Django, 
which provides the base class for creating and managing User model instances.

The CustomUser model includes fields for 'username', 'is_staff', 'is_active', and 'is_superuser'. 
These fields represent the data that will be stored for each user in the database.
"""

# Import necessary classes from Django's auth and db modules
from django.contrib.auth.models import  AbstractUser
from django.db import models

class UserProfile(AbstractUser):
    thread_id = models.CharField(max_length=255, null=True, blank=True)
   