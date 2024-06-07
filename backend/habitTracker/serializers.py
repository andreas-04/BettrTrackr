"""
This file contains the serializers for the HabitTracker application. 

Serializers in Django REST Framework are similar to Django Form classes, and include similar 
validation flags on the various fields, such as required, max_length and default.

The serializers in this file are used to convert complex data types, like queryset and model 
instances, to Python native datatypes that can then be easily rendered into JSON, XML or other 
content types. They also provide deserialization, validating incoming data and turning it into 
a fully populated model instance.

There are two serializers in this file: TaskSerializer and HabitTrackerSerializer. 
"""

# Import the necessary modules from rest_framework and the models from the current directory
from rest_framework import serializers
from .models import Task, HabitTracker, Goal, MentorConfig


# Define the serializer for the Task model
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = Task
        # Specify the fields to be included in the serialized representation
        fields = ['id', 'name', 'completed', 'goal', 'habit_tracker']


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'name', 'habit_tracker']

# Define the serializer for the HabitTracker model
class HabitTrackerSerializer(serializers.ModelSerializer):
    task_set = TaskSerializer(many=True, read_only=True)
    goal_set = GoalSerializer(many=True,read_only=True)
    class Meta:
        model = HabitTracker
        fields = ['id', 'user', 'task_set', 'daily_completed_percentage', 'weekly_completed_percentage', 'lifetime_completed_percentage', 'goal_set', 'mentorPrompt']

class MentorConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorConfig
        fields=['id', 'habit_tracker', 'personality_prompt', 'communication_style', 'language_preference']