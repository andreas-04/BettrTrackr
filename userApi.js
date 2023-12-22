import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/user_api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default {
  getHabitTrackersByUserId(userId) {
    return apiClient.get(`/users/${userId}/habit_trackers/`);
  }
};