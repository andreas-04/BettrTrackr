from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, HabitTrackerViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'habitTrackers', HabitTrackerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]