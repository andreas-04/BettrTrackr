"""
This script defines a function that processes serialized habit tracker data.
It takes in a dictionary containing user data, tasks, goals, wellness snapshots, and a journal entry.
The function processes each piece of data and returns a formatted string containing the processed data.
"""

# Import necessary libraries
import json
import requests
from openai import OpenAI

# Function to process serialized habit tracker data
def promptify_serialized_habitTracker(json_data):
  # Extract user id from the JSON data
  user_id = json_data["user"]
  # Extract task set from the JSON data
  task_set = json_data["task_set"]
  # Extract daily completed percentage from the JSON data
  daily_completed_percentage = json_data["daily_completed_percentage"]
  # Extract long term completed percentage from the JSON data
  longterm_completed_percentage = json_data["longterm_completed_percentage"]
  # Extract goal set from the JSON data
  goal_set = json_data["goal_set"]
  # Extract journal entry from the JSON data
  journal_entry = json_data["journal_entry"]
  # Extract wellness snapshot set from the JSON data
  wellness_snapshot_set = json_data["wellnesssnapshot_set"]

  # Process task set
  task_output = "\nHabit Tracking:\n"
  for task in task_set:
      # Append task name and completion status to the task output
      task_output += f"  {task['name']}: {'complete' if task['completed'] else 'Incomplete'}\n"

  # Process goal set
  goal_output = "\nGoals:\n"
  for goal in goal_set:
      # Append goal name and status to the goal output
      goal_output += f"  {goal['name']}. {'Complete' if goal['status'] else 'Incomplete'}\n"

  # Process wellness snapshot set
  wellness_output = "\nWellness Snapshot:\n"
  for snapshot in wellness_snapshot_set:
      # Append snapshot name and score to the wellness output
      wellness_output += f"  {snapshot['name']}: {snapshot['score']}/5\n"

  # Combine outputs
  output = f"user data for {user_id}:\n{goal_output}{wellness_output}{task_output}\nAverage Completion (past 2 weeks): {daily_completed_percentage}%\nDaily Journal Entry:\n\"{journal_entry}\""

  # Return the combined output
  return output