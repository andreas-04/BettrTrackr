To achieve this, you can use a task scheduler like Celery with Django. Celery is an asynchronous task queue/job queue based on distributed message passing. It is focused on real-time operation, but also supports scheduling.

Here's a general outline of the steps you would need to take:

1. Install Celery and its dependencies.
2. Configure Celery to work with your Django project.
3. Create a Celery task that sets all tasks to incomplete.
4. Schedule this task to run at midnight every day.

Here's how you can create a Celery task:

```python
from celery import shared_task
from .models import Task

@shared_task
def reset_tasks():
    Task.objects.update(completed=False)
```

This task will set the `completed` field of all `Task` instances to `False`.

To schedule this task to run at midnight every day, you can use the Celery beat scheduler. Here's an example of how you can configure it in your project's settings:

```python
CELERY_BEAT_SCHEDULE = {
    'reset-tasks-every-midnight': {
        'task': 'path.to.your.tasks.reset_tasks',
        'schedule': crontab(hour=0, minute=0),
    },
}
```

This will schedule the `reset_tasks` task to run every day at midnight.

Please replace `'path.to.your.tasks.reset_tasks'` with the actual Python import path of your `reset_tasks` function.

Note: This is a high-level overview and may not cover all the details. You will need to install and configure Celery and its dependencies, and you may need to adjust the code to fit your specific project setup.