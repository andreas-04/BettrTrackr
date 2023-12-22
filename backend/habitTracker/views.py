from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task, HabitTracker
from .serializers import TaskSerializer, HabitTrackerSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class HabitTrackerViewSet(viewsets.ModelViewSet):
    queryset = HabitTracker.objects.all()
    serializer_class = HabitTrackerSerializer
    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        habit_tracker = self.get_object()
        tasks = Task.objects.filter(habit_tracker=habit_tracker)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)