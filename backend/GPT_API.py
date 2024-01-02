import json
import requests
from openai import OpenAI

def promptify_serialized_habitTracker(json_data):
    user_id = json_data["user"]
    task_set = json_data["task_set"]
    daily_completed_percentage = json_data["daily_completed_percentage"]
    longterm_completed_percentage = json_data["longterm_completed_percentage"]
    goal_set = json_data["goal_set"]
    journal_entry = json_data["journal_entry"]
    wellness_snapshot_set = json_data["wellnesssnapshot_set"]

    # Process task_set
    task_output = "\nHabit Tracking:\n"
    for task in task_set:
        task_output += f"    {task['name']}: {'complete' if task['completed'] else 'Incomplete'}\n"

    # Process goal_set
    goal_output = "\nGoals:\n"
    for goal in goal_set:
        goal_output += f"    {goal['name']}. {'Complete' if goal['status'] else 'Incomplete'}\n"

    # Process wellness_snapshot_set
    wellness_output = "\nWellness Snapshot:\n"
    for snapshot in wellness_snapshot_set:
        wellness_output += f"    {snapshot['name']}: {snapshot['score']}/5\n"

    # Combine outputs
    output = f"user data for {user_id}:\n{goal_output}{wellness_output}{task_output}\nAverage Completion (past 2 weeks): {daily_completed_percentage}%\nDaily Journal Entry:\n\"{journal_entry}\""

    return output


