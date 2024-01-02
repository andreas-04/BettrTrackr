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
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from openai import OpenAI

# Define a manager for the CustomUser model
class CustomUserManager(BaseUserManager):
    # Method to create a regular user
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username)
        user.set_password(password)
        user.save(using=self._db)



    # Method to create a superuser
    def create_superuser(self, username, password):
        user = self.create_user(username, password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# Define the CustomUser model
class CustomUser(AbstractBaseUser):
    # Set the manager for the model
    objects = CustomUserManager()
    # Define the fields for the model
    username = models.CharField(max_length=255, unique=True)
    thread_id = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'

    # Method to check permissions
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    # Method to check module permissions
    def has_module_perms(self, app_label):
        return self.is_superuser