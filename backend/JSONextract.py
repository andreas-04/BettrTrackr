import json

def extract_data(json_data):
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

# # Example usage with the provided JSON string
# sample_json = '''
# {
#     "id": 23,
#     "user": 1,
#     "task_set": [
#         {
#             "id": 37,
#             "name": "read 10 pages",
#             "completed": false,
#             "habit_tracker": 23
#         },
#         {
#             "id": 38,
#             "name": "Workout",
#             "completed": true,
#             "habit_tracker": 23
#         },
#         {
#             "id": 39,
#             "name": "meditate",
#             "completed": true,
#             "habit_tracker": 23
#         }
#     ],
#     "daily_completed_percentage": 66.66666666666666,
#     "longterm_completed_percentage": 88.88888888888887,
#     "goal_set": [
#         {
#             "id": 1,
#             "name": "Bench 225 lbs",
#             "status": false,
#             "habit_tracker": 23
#         },
#         {
#             "id": 2,
#             "name": "Finish coding my app",
#             "status": false,
#             "habit_tracker": 23
#         }
#     ],
#     "journal_entry": "Today was productive; finished my meditation and exercise routine. However, couldn't find time to read. Need to work on that for a more balanced day.",
#     "wellnesssnapshot_set": [
#         {
#             "id": 13,
#             "name": "mindfulness",
#             "score": 5,
#             "habit_tracker": 23
#         },
#         {
#             "id": 14,
#             "name": "nutrition",
#             "score": 3,
#             "habit_tracker": 23
#         },
#         {
#             "id": 15,
#             "name": "productivity",
#             "score": 4,
#             "habit_tracker": 23
#         }
#     ]
# }
# '''

# parsed_json = json.loads(sample_json)
# result = extract_data(parsed_json)
# print(result)
