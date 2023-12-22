from django.test import TestCase
from rest_framework.test import APIClient
from .models import Task, HabitTracker
from users.models import CustomUser

class HabitTrackerModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = CustomUser.objects.create(username='testuser', password='testpassword')
        habit_tracker = HabitTracker.objects.create(completed=False, user=user)
        Task.objects.create(name='testtask', habit_tracker=habit_tracker)

    def test_task_name_label(self):
        task = Task.objects.get(id=1)
        field_label = task._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_habit_tracker_completed_label(self):
        habit_tracker = HabitTracker.objects.get(id=1)
        field_label = habit_tracker._meta.get_field('completed').verbose_name
        self.assertEqual(field_label, 'completed')

class HabitTrackerAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create(username='testuser', password='testpassword')
        self.habit_tracker = HabitTracker.objects.create(completed=False, user=self.user)
        self.task = Task.objects.create(name='testtask', habit_tracker=self.habit_tracker)

    def test_get_habit_trackers(self):
        response = self.client.get('/api/habitTrackers/')
        self.assertEqual(response.status_code, 200)

    def test_get_tasks(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, 200)