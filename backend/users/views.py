"""
This file, views.py, is part of the Django application and is responsible for defining 
the views for the CustomUser model.

It uses Django Rest Framework's viewsets to create a view set for the CustomUser model. 
The view set includes standard actions provided by the ModelViewSet class, such as list, 
create, retrieve, update, and delete.

In addition to the standard actions, a custom action named 'habit_trackers' is defined. 
This action is used to retrieve the HabitTracker objects associated with a specific user. 
The HabitTracker objects are filtered based on the user, serialized, and then returned in the response.

The 'create' method is overridden to handle user creation. The method hashes the password 
before saving the user. After the user is saved, a cookie is set with the user's id
 and a response is returned with the user's id.

The file imports necessary modules from Django Rest Framework, the CustomUser model, 
the CustomUserSerializer, the HabitTracker model, the HabitTrackerSerializer, 
and the make_password function from django.contrib.auth.hashers.
"""
# Import the necessary modules from the Django Rest Framework
from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from habitTracker.models import HabitTracker
from habitTracker.serializers import HabitTrackerSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password
from openai import OpenAI

# Define a view set for the CustomUser model
class CustomUserViewSet(viewsets.ModelViewSet):
    # Specify the queryset to use for this view
    queryset = CustomUser.objects.all()
    # Specify the serializer to use for this view
    serializer_class = CustomUserSerializer

    # Define a custom action for this view that retrieves the habit trackers for a specific user
    @action(detail=True, methods=['get'])
    def habit_trackers(self, request, pk=None):
        # Get the user object
        user = self.get_object()
        # Filter the HabitTracker objects for this user
        habit_trackers = HabitTracker.objects.filter(user=user)
        # Serialize the habit trackers
        serializer = HabitTrackerSerializer(habit_trackers, many=True)
        # Return the serialized data
        return Response(serializer.data)
    
    # Override the create method to handle user creation
    def create(self, request):
        # Make a mutable copy of the request data
        data = request.data.copy()
        # Get the password from the data
        password = data.get('password')
        # If a password is provided, hash it and store it in the data
        if password:
            data['password'] = make_password(password)
        # Create a serializer with the data
        serializer = CustomUserSerializer(data=data)
        # If the serializer is valid
        if serializer.is_valid():
            # Save the user
            user = serializer.save()

            client = OpenAI()
            thread = client.beta.threads.create()

            user.thread_id = thread.id
            user.save()
            
            # Create a response with the user's id
            response = Response({'id': user.id}, status=status.HTTP_201_CREATED)
            # Set a cookie with the user's id
            max_age = 365 * 24 * 60 * 60  # One year
            response.set_cookie('userID', user.id, max_age=max_age)
            # Return the response
            return response
        # If the serializer is not valid, return an error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)