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
def promptify_serialized_habitTracker(json_data, message):
  # Extract user id from the JSON data
  user_id = json_data["user"]
  # Extract task set from the JSON data
  task_set = json_data["task_set"]
  # Extract daily completed percentage from the JSON data
  daily_completed_percentage = json_data["daily_completed_percentage"]
  # Extract long term completed percentage from the JSON data
  weekly_completed_percentage = json_data["weekly_completed_percentage"]

  lifetime_completed_percentage = json_data["lifetime_completed_percentage"]
  # Extract goal set from the JSON data
  goal_set = json_data["goal_set"]
  
  # Process task set
  task_output = "\nHabits:\n"
  for task in task_set:
      # Append task name and completion status to the task output
      task_output += f"  {task['name']}: {'complete' if task['completed'] else 'Incomplete'}\n"

  # Process goal set
  goal_output = "\nGoals:\n"
  for goal in goal_set:
      # Append goal name and status to the goal output
      goal_output += f"  {goal['name']}. \n"

  # Process wellness snapshot set

  # Combine outputs
  output = f"This following data represents a users goals, habits and consistency, represented in completion percentages\n{goal_output}{task_output}\nDaily Completion: {daily_completed_percentage}% Weekly Completion: {weekly_completed_percentage}% Lifetime Completion: {lifetime_completed_percentage}%\n The user has also attached a message: {message}"

  # Return the combined output
  return output