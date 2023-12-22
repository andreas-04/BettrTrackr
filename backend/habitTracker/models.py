"""
This file defines the data models for the HabitTracker application. 
It includes two models: Task and HabitTracker. 

The Task model represents a task that a user can complete as part of their habit tracking. 
Each task is associated with a specific HabitTracker instance.

The HabitTracker model represents a user's habit tracker. 
It keeps track of whether the HabitTracker has been completed and is associated with a specific user.
"""

# Import the models module from django.db
from django.db import models

# Define the Task model
class Task(models.Model):
    # The name of the task, represented as a string of maximum length 200
    name = models.CharField(max_length=200)
    # A foreign key reference to the HabitTracker model, 
    # indicating that each task is associated with a specific habit tracker
    habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE)

# Define the HabitTracker model
class HabitTracker(models.Model):
    # A boolean field that indicates whether the habit has been completed, default is False
    completed = models.BooleanField(default=False)
    # A foreign key reference to the CustomUser model in the users app, 
    # indicating that each habit tracker is associated with a specific user
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)