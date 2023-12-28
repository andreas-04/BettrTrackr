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
from .models import Task, HabitTracker, DailyCompletion, DailyEntry

class DailyEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyEntry
        fields = ['date', 'journal_entry']

# Define the serializer for the Task model
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = Task
        # Specify the fields to be included in the serialized representation
        fields = ['id', 'name', 'completed', 'habit_tracker']

# Define the serializer for the HabitTracker model
class HabitTrackerSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    daily_entries = DailyEntrySerializer(many=True, read_only=True)

    class Meta:
        model = HabitTracker
        fields = ['id', 'user', 'tasks', 'daily_completed_percentage', 'longterm_completed_percentage', 'daily_entries']