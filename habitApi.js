import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default {
  getHabitTrackerTasks(habitId) {
    return apiClient.get(`/habitTrackers/${habitId}/tasks/`);
  },
  postHabitTracker(userID){
    return apiClient.post(`/habitTrackers/`, userID)
  },
  deleteTask(taskId) {
    return apiClient.delete(`/tasks/${taskId}/`);
  },
  addTask(taskData) {
    return apiClient.post('/tasks/', taskData);
  },
  updateTask(taskId, completed) {
    return apiClient.put(`/tasks/${taskId}/`, completed);
  },
  updateJournal(journalData, habitId) {
    return apiClient.put(`/habitTrackers/${habitId}/`, journalData)
  },
  getHabitTracker(habitId) {
    return apiClient.get(`/habitTrackers/${habitId}/`)
  },
  getGoals(habitId) {
    return apiClient.get(`/habitTrackers/${habitId}/goals/`)
  },
  addGoal(goalData) {
    return apiClient.post(`/goals/`, goalData)
  },
  deleteGoal(goalId) {
    return apiClient.delete(`/goals/${goalId}/`)
  },
  updateGoal(goalId, goalData) {
    return apiClient.put(`/goals/${goalId}`, goalData)
  },
  getSnapshots(habitId) {
    return apiClient.get(`/habitTrackers/${habitId}/wellnessSnapshot/`)
  },
  addSnapshot(snapshotData) {
    return apiClient.post(`/snapshots/`, snapshotData)
  },
  deleteSnapshot(snapId) {
    return apiClient.delete(`/snapshots/${snapId}`)
  },
  updateMentorPrompt(mentorData, habitId) {
    return apiClient.put(`/habitTracker/${habitId}/`, mentorData)
  },
  

};