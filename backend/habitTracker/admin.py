# Register your models here.
from django.contrib import admin
from .models import HabitTracker, Task, WellnessSnapshot

admin.site.register(HabitTracker)
admin.site.register(Task)
admin.site.register(WellnessSnapshot)
