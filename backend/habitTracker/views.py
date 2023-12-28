"""
This file defines the viewsets for the HabitTracker and Task models in the Django REST framework. 
A viewset is a class of views that provides CRUD operations by default.

This file contains two viewsets: HabitTrackerViewSet and TaskViewSet. 
The HabitTrackerViewSet includes an additional action to retrieve all tasks associated with a specific habit tracker.
"""

# Import necessary modules from the Django REST framework
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Import the models and serializers for this app
from .models import Task, HabitTracker
from .serializers import TaskSerializer, HabitTrackerSerializer

# Define the viewset for the Task model
class TaskViewSet(viewsets.ModelViewSet):
    # Define the queryset to be all Task objects
    queryset = Task.objects.all()
    # Define the serializer class to be the TaskSerializer
    serializer_class = TaskSerializer

# Define the viewset for the HabitTracker model
class HabitTrackerViewSet(viewsets.ModelViewSet):
    # Define the queryset to be all HabitTracker objects
    queryset = HabitTracker.objects.all() 
    # Define the serializer class to be the HabitTrackerSerializer
    serializer_class = HabitTrackerSerializer

    # Define an additional action for this viewset
    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        # Get the HabitTracker object for the given primary key
        habit_tracker = self.get_object()
        # Filter the Task objects to get those associated with this HabitTracker
        tasks = Task.objects.filter(habit_tracker=habit_tracker)
        # Serialize the tasks
        serializer = TaskSerializer(tasks, many=True)
        # Return the serialized data
        return Response(serializer.data)