from rest_framework import serializers
from .models import Task, HabitTracker

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'habit_tracker']

class HabitTrackerSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = HabitTracker
        fields = ['id', 'completed', 'user', 'tasks']