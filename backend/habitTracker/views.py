# This file defines the views for the Habit Tracker application. Views in Django are responsible for processing incoming HTTP requests and returning HTTP responses.
# They are essentially Python functions that take a Web request and return a Web response.

# Import necessary modules from the Django REST framework
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Import the models and serializers for this app
from .models import Task, HabitTracker, WellnessSnapshot, Goal
from .serializers import TaskSerializer, HabitTrackerSerializer, WellnessSnapshotSerializer, GoalSerializer

# Define the viewset for the Goal model
class GoalViewSet(viewsets.ModelViewSet):
   # Specify the queryset to be all Goal objects
   queryset = Goal.objects.all()
   # Specify the serializer class to be the GoalSerializer
   serializer_class = GoalSerializer

# Define the viewset for the WellnessSnapshot model
class WellnessSnapshotViewSet(viewsets.ModelViewSet):
   # Specify the queryset to be all WellnessSnapshot objects
   queryset = WellnessSnapshot.objects.all()
   # Specify the serializer class to be the WellnessSnapshotSerializer
   serializer_class = WellnessSnapshotSerializer

# Define the viewset for the Task model
class TaskViewSet(viewsets.ModelViewSet):
   # Specify the queryset to be all Task objects
   queryset = Task.objects.all()
   # Specify the serializer class to be the TaskSerializer
   serializer_class = TaskSerializer

# Define the viewset for the HabitTracker model
class HabitTrackerViewSet(viewsets.ModelViewSet):
   # Specify the queryset to be all HabitTracker objects
   queryset = HabitTracker.objects.all() 
   # Specify the serializer class to be the HabitTrackerSerializer
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
   
   @action(detail=True, methods=['get'])
   def goals(self, request, pk=None):
      # Get the HabitTracker object for the given primary key
      habit_tracker = self.get_object()
      # Filter the Goal objects to get those associated with this HabitTracker
      goals = Goal.objects.filter(habit_tracker=habit_tracker)
      # Serialize the goals
      serializer = GoalSerializer(goals, many=True)
      # Return the serialized data
      return Response(serializer.data)
   
   @action(detail=True, methods=['get'])
   def wellnessSnapshot(self, request, pk=None):
       habit_tracker = self.get_object()
       snapshot = WellnessSnapshot.objects.filter(habit_tracker=habit_tracker)
       serializer = WellnessSnapshotSerializer(snapshot, many=True)
       return Response(serializer.data)
   
   @action(detail=True, methods=['post'])
   def submit(self, request, pk=None):
       habit_tracker = self.get_object()
       habit_tracker.submit()
       return Response({"status": "success"})