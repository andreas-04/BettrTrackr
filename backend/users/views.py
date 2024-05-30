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
from .models import UserProfile
from .serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from habitTracker.models import HabitTracker
from habitTracker.serializers import HabitTrackerSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from openai import OpenAI
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password


# Define a view set for the CustomUser model
class CustomUserViewSet(viewsets.ModelViewSet):
    # Specify the queryset to use for this view
    queryset = UserProfile.objects.all()
    # Specify the serializer to use for this view
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

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
    
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            password = serializer.validated_data['password']
            serializer.validated_data['password'] = make_password(password)

            user = serializer.save()
            client = OpenAI(api_key="KEY_HERE")
            thread = client.beta.threads.create()
            user.thread_id = thread.id
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            response = JsonResponse({"detail": "Login successful"}, status=status.HTTP_200_OK)
            response.set_cookie('userID', user.id, max_age=30*24*60*60, httponly=False, secure=False, samesite='None')
            return response
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

def LogoutView(request):
    logout(request)
    response = JsonResponse({'message': 'Successfully logged out.'})
    response.delete_cookie('userID')
    response.delete_cookie('csrftoken')
    response.delete_cookie('sessionid')
    return response
