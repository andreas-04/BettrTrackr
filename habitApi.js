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
};