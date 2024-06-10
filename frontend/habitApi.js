// Importing axios library for making HTTP requests
import axios from 'axios';
// Creating an instance of axios with custom configuration
const apiClient = axios.create({
 // Base URL for all requests
 baseURL: 'http://localhost:8000/api',
 // Headers to be sent with every request
 headers: {
   'Content-Type': 'application/json',
 },
 // Include credentials in cross-origin requests
 withCredentials: true,
});
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const csrfToken = getCookie('csrftoken');

// Exporting an object containing methods for interacting with the API
export default {
 // Method to get tasks for a specific habit tracker
 getTasks(habitId) {
   // Make a GET request to the '/habitTrackers/{habitId}/tasks/' endpoint
   return apiClient.get(`/habitTrackers/${habitId}/tasks/`);
 },
 // Method to create a new habit tracker
 postHabitTracker(userID){
   // Make a POST request to the '/habitTrackers/' endpoint with the user ID as data
   return apiClient.post(`/habitTrackers/`, userID)
 },
 // Method to delete a specific task
 deleteTask(taskId) {
   // Make a DELETE request to the '/tasks/{taskId}/' endpoint
   return apiClient.delete(`/tasks/${taskId}/`);
 },

 // Method to add a new task
 addTask(taskData) {
   // Make a POST request to the '/tasks/' endpoint with the task data as data
   return apiClient.post('/tasks/', taskData, {
    headers: {
        'X-CSRFToken': csrfToken,
    },
  });
},
 // Method to update a specific task
 updateTask(taskId, completed) {
   // Make a PUT request to the '/tasks/{taskId}/' endpoint with the completion status as data
   return apiClient.put(`/tasks/${taskId}/`, completed, {
    headers: {
        'X-CSRFToken': csrfToken,
    },
  });
},
 // Method to update the journal for a specific habit tracker

 // Method to get a specific habit tracker
 getHabitTracker(habitId) {
   // Make a GET request to the '/habitTrackers/{habitId}/' endpoint
   return apiClient.get(`/habitTrackers/${habitId}/`)
 },
 // Method to get goals for a specific habit tracker
 getGoals(habitId) {
   // Make a GET request to the '/habitTrackers/{habitId}/goals/' endpoint
   return apiClient.get(`/habitTrackers/${habitId}/goals/`)
 },
 // Method to add a new goal
 addGoal(goalData) {
   // Make a POST request to the '/goals/' endpoint with the goal data as data
   return apiClient.post(`/goals/`, goalData, {
      headers: {
          'X-CSRFToken': csrfToken,
      },
    });
  },
 // Method to delete a specific goal
 deleteGoal(goalId) {
   // Make a DELETE request to the '/goals/{goalId}/' endpoint
   return apiClient.delete(`/goals/${goalId}/`)
 },
 // Method to update a specific goal
 updateGoal(goalId, goalData) {
   // Make a PUT request to the '/goals/{goalId}' endpoint with the goal data as data
   return apiClient.put(`/goals/${goalId}`, goalData)
 },

 // Method to update the mentor prompt for a specific habit tracker
 updateMentorPrompt(mentorData, habitId) {
   // Make a PUT request to the '/habitTrackers/{habitId}/' endpoint with the mentor data as data
   return apiClient.put(`/habitTrackers/${habitId}/`, mentorData)
 },
 // Method to submit a system prompt for a specific habit tracker
 systemPrompt(habitId) {
   // Make a POST request to the '/habitTrackers/{habitId}/submit/' endpoint
   return apiClient.post(`/habitTrackers/${habitId}/submit/`)
 },
  postMessage(habitId, message) {
    return apiClient.post(`/send_message/${habitId}/`, message, {
      headers: {
          'X-CSRFToken': csrfToken,
      },
    });
  },
  getConfig(habitId){
    return apiClient.get(`/getConfig/${habitId}/`, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
  },
  putConfig(configId, data) {
    return apiClient.put(`/mentor_config/${configId}/`, data, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
  }

};