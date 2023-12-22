from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from habitTracker.models import HabitTracker
from habitTracker.serializers import HabitTrackerSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=['get'])
    def habit_trackers(self, request, pk=None):
        user = self.get_object()
        habit_trackers = HabitTracker.objects.filter(user=user)
        serializer = HabitTrackerSerializer(habit_trackers, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        data = request.data.copy()  # Make a mutable copy
        password = data.get('password')
        if password:
            data['password'] = make_password(password)
        serializer = CustomUserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            serializer.save()
            return Response({'id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)