"""
This script defines a function that processes serialized habit tracker data.
It takes in a dictionary containing user data, tasks, goals, wellness snapshots, and a journal entry.
The function processes each piece of data and returns a formatted string containing the processed data.
"""

# Import necessary libraries
import json
import requests
from openai import OpenAI

communication_style_mapping = {
    'motivational': 'Motivational: Providing uplifting messages to inspire action.',
    'problem-solving': 'Problem-Solving: Offering practical strategies to overcome challenges.',
    'collaborative': 'Collaborative: Encouraging user participation in decision-making.',
    'reflective': 'Reflective: Promoting introspection and self-discovery through questions.'
}
lang_pref_mapping = {
    'informative': 'Informative: Providing factual and educational content.',
    'supportive': 'Supportive: Delivering empathetic and comforting messages.',
    'encouraging': 'Encouraging: Offering words of empowerment and positivity.',
    'assertive': 'Assertive: Providing firm guidance and direction for accountability.'
}
# Function to process serialized habit tracker data
def promptify_serialized_habitTracker(habit, message, config):

    task_set = habit["task_set"]
    daily_completed_percentage = habit["daily_completed_percentage"]
    weekly_completed_percentage = habit["weekly_completed_percentage"]
    lifetime_completed_percentage = habit["lifetime_completed_percentage"]
    goal_set = habit["goal_set"]
    task_output = "\nHabits:\n"
    for task in task_set:
        task_output += f"  {task['name']}: {'complete' if task['completed'] else 'Incomplete'}\n"
    goal_output = "\nGoals:\n"
    for goal in goal_set:
        goal_output += f"  {goal['name']}. \n"

    personality_prompt = config["personality_prompt"]
    communication_style = config["communication_style"]
    language_preference = config["language_preference"]

    detailed_communication_style = communication_style_mapping.get(communication_style, "No Communication Style Provided")
    detailed_language_preference = lang_pref_mapping.get(language_preference, "No Language Prefeerence provided")

    output = f"The following details are the users desired mentor configuration settings. Your personality prompt is {personality_prompt} . The users desired communication style is: {detailed_communication_style}. The users language preference is:{detailed_language_preference}. The following data represents a users goals, habits and consistency, represented in completion percentages. \n{goal_output}{task_output}\nDaily Completion: {daily_completed_percentage}% Weekly Completion: {weekly_completed_percentage}% Lifetime Completion: {lifetime_completed_percentage}%\n The user has also attached a message for you: {message}"
    print(output)
    # Return the combined output
    return output