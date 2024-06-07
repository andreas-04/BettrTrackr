
# Import the models module from django.db
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime
from rest_framework.renderers import JSONRenderer
from django.core.validators import MinValueValidator, MaxValueValidator
from openai import OpenAI
from .habitTrackerProcessor import promptify_serialized_habitTracker



class DailyCompletion(models.Model):
    habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    daily_completed_percentage = models.FloatField(default=0.0)
        
class Goal(models.Model):
   name = models.CharField(max_length=200)
   habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE)

# Define the Task model
class Task(models.Model):
    # The name of the task, represented as a string of maximum length 200
    name = models.CharField(max_length=200, null=True)
    # A boolean field that indicates whether a task instance has been completed, default is False
    completed = models.BooleanField(default=False)
    # A foreign key reference to the HabitTracker model, 
    # indicating that each task is associated with a specific habit tracker
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, null=True)
    habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE, null=True)
    
class HabitTracker(models.Model):
    # A foreign key reference to the CustomUser model in the users app, 
    # indicating that each habit tracker is associated with a specific user
    user = models.ForeignKey('users.UserProfile', on_delete=models.CASCADE)
    daily_completed_percentage = models.FloatField(default=0.0)
    weekly_completed_percentage = models.FloatField(default=0.0)
    lifetime_completed_percentage = models.FloatField(default=0.0)

    mentorPrompt = models.TextField(null=True, blank=True)

    @receiver(post_save, sender=Task)
    def update_completed_percentage(sender, instance, created, **kwargs):
        # if not created and instance.completed:
            habit_tracker = instance.habit_tracker
            total_tasks = habit_tracker.task_set.count()
            if total_tasks > 0:
                completed_tasks = habit_tracker.task_set.filter(completed=True).count()
                habit_tracker.daily_completed_percentage = (completed_tasks / total_tasks) * 100
            else:
                habit_tracker.daily_completed_percentage = 0.0
            habit_tracker.save()

            # Check if a DailyCompletion exists for today
            today = datetime.date.today()
            try:
                daily_completion = DailyCompletion.objects.get(habit_tracker=habit_tracker, date=today)
                # Update the existing DailyCompletion
                daily_completion.daily_completed_percentage = habit_tracker.daily_completed_percentage
                daily_completion.save()
            except DailyCompletion.DoesNotExist:
                # Create a new DailyCompletion if none exists for today
                DailyCompletion.objects.create(
                    habit_tracker=habit_tracker,
                    date=today,
                    daily_completed_percentage=habit_tracker.daily_completed_percentage
                )

            # Calculate the average of the daily completion percentages for the last 7 days
            habit_tracker.weekly_completed_percentage = DailyCompletion.objects.filter(habit_tracker=habit_tracker, date__gte=datetime.date.today() - datetime.timedelta(days=7)).aggregate(models.Avg('daily_completed_percentage'))['daily_completed_percentage__avg']

            habit_tracker.lifetime_completed_percentage = DailyCompletion.objects.filter(habit_tracker=habit_tracker).aggregate(models.Avg('daily_completed_percentage'))['daily_completed_percentage__avg']

            habit_tracker.save()
    
class MentorConfig(models.Model):
    habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE)
    personality_prompt = models.CharField(max_length=300, null=True)
    communication_style = models.CharField(max_length=255,
        choices=[
            ('motivational','Motivational: Providing uplifting messages to inspire action.'),
            ('problem-solving','Problem-Solving: Offering practical strategies to overcome challenges.'),
            ('collaborative','Collaborative: Encouraging user participation in decision-making.'),
            ('reflective','Reflective: Promoting introspection and self-discovery through questions.')
        ], null=True, blank=True
    )
    language_preference = models.CharField(max_length=255, 
        choices=[
            ('informative','Informative: Providing factual and educational content.'),
            ('supportive','Supportive: Delivering empathetic and comforting messages.'),
            ('encouraging','Encouraging: Offering words of empowerment and positivity.'),
            ('assertive','Assertive: Providing firm guidance and direction for accountability.')
        ], null=True, blank=True)

