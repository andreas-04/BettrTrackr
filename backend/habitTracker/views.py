# This file defines the views for the Habit Tracker application. Views in Django are responsible for processing incoming HTTP requests and returning HTTP responses.
# They are essentially Python functions that take a Web request and return a Web response.

# Import necessary modules from the Django REST framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .habitTrackerProcessor import promptify_serialized_habitTracker
# Import the models and serializers for this app
from .models import Task, HabitTracker, Goal
from .serializers import TaskSerializer, HabitTrackerSerializer, GoalSerializer
from openai import OpenAI
import time

# Define the viewset for the Goal model
class GoalViewSet(viewsets.ModelViewSet):
   # Specify the queryset to be all Goal objects
   queryset = Goal.objects.all()
   # Specify the serializer class to be the GoalSerializer
   serializer_class = GoalSerializer



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

      # Fetch all goals associated with this HabitTracker
      goals = Goal.objects.filter(habit_tracker=habit_tracker)

      # Initialize an empty list to hold all tasks
      all_tasks = []

      # Iterate over each goal and fetch its tasks
      for goal in goals:
         tasks = Task.objects.filter(goal=goal)
         # Append the tasks to the all_tasks list
         all_tasks.extend(tasks)

      # Serialize the tasks
      serializer = TaskSerializer(all_tasks, many=True)
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
   
   @action(detail=True, methods=['post'])
   def submit(self, request, pk=None):
       habit_tracker = self.get_object()
       habit_tracker.submit()
       return Response({"status": "success"})
   
class SendMessage(APIView):
   def post(self, request, habitId ):
      if (request.data.get('message')):
         habit_tracker = HabitTracker.objects.get(pk=habitId)
         serializer = HabitTrackerSerializer(habit_tracker)
         msg = request.data.get('message')
         prompt = promptify_serialized_habitTracker(serializer.data, msg)
         client = OpenAI()
         message = client.beta.threads.messages.create(
            thread_id=habit_tracker.user.thread_id,
            role="user",
            content=prompt
         )
         run = client.beta.threads.runs.create(
            thread_id=habit_tracker.user.thread_id,
            assistant_id="asst_Sy64Dch7BiGm7Q54v14m3eyo",
         )
         time.sleep(5)
         messages = client.beta.threads.messages.list(
            thread_id=habit_tracker.user.thread_id
         )
         if len(messages.data) > 1:
            assistant_messages = [msg for msg in messages.data if msg.assistant_id is not None]
            # Directly take the last message if the list is ordered chronologically
            latest_assistant_message = assistant_messages[0]
            # Extract the content of the latest message
            latest_message_content = latest_assistant_message.content[0].text.value
         return Response(latest_message_content, status=status.HTTP_200_OK)
      
      return Response(status=status.HTTP_400_BAD_REQUEST)