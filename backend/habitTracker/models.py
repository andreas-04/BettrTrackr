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
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime
from rest_framework.renderers import JSONRenderer

# Define the Task model
class Task(models.Model):
    # The name of the task, represented as a string of maximum length 200
    name = models.CharField(max_length=200)
    # A boolean field that indicates whether a task instance has been completed, default is False
    completed = models.BooleanField(default=False)
    # A foreign key reference to the HabitTracker model, 
    # indicating that each task is associated with a specific habit tracker
    habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE)

# Define the HabitTracker model
class HabitTracker(models.Model):
    # A foreign key reference to the CustomUser model in the users app, 
    # indicating that each habit tracker is associated with a specific user
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    daily_completed_percentage = models.FloatField(default=0.0)
    longterm_completed_percentage = models.FloatField(default=0.0)
    journal_entry = models.TextField(null=True, blank=True)

    @receiver(post_save, sender=Task)
    def update_completed_percentage(sender, instance, **kwargs):
        habit_tracker = instance.habit_tracker
        total_tasks = habit_tracker.task_set.count()
        if total_tasks > 0:
            completed_tasks = habit_tracker.task_set.filter(completed=True).count()
            habit_tracker.daily_completed_percentage = (completed_tasks / total_tasks) * 100
        else:
            habit_tracker.daily_completed_percentage = 0.0
        habit_tracker.save()

        # Create a new DailyCompletion instance for today
        DailyCompletion.objects.create(
            habit_tracker=habit_tracker,
            daily_completed_percentage=habit_tracker.daily_completed_percentage
        )

        # Calculate the average of the daily completion percentages for the last 14 days
        daily_completions = DailyCompletion.objects.filter(
            habit_tracker=habit_tracker,
            date__gte=datetime.date.today() - datetime.timedelta(days=14)
        )
        habit_tracker.longterm_completed_percentage = daily_completions.aggregate(
            models.Avg('daily_completed_percentage')
        )['daily_completed_percentage__avg']
        habit_tracker.save()
    
    def snapshot(self):
        from .serializers import HabitTrackerSerializer
        serializer = HabitTrackerSerializer(self)
        json_snapshot = JSONRenderer().render(serializer.data)
        return json_snapshot

class DailyCompletion(models.Model):
    habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    daily_completed_percentage = models.FloatField(default=0.0)

