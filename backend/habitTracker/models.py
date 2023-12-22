from django.db import models
#from users.models import CustomUser
class Task(models.Model):
    name = models.CharField(max_length=200)
    habit_tracker = models.ForeignKey('HabitTracker', on_delete=models.CASCADE)

class HabitTracker(models.Model):
    completed = models.BooleanField(default=False)
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
