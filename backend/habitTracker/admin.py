# Register your models here.
from django.contrib import admin
from .models import HabitTracker, Task

admin.site.register(HabitTracker)
admin.site.register(Task)
