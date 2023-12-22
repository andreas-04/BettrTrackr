/*
 * This file defines a module that exports an object with methods for making HTTP requests to the User API.
 * It uses the axios library to create an HTTP client with a specified base URL and default headers.
 * The withCredentials option is set to true to include credentials in cross-origin requests.
 *
 * The exported object has two methods:
 * 1. getHabitTrackersByUserId: This method makes a GET request to retrieve habit trackers for a specific user.
 * 2. createUser: This method makes a POST request to create a new user with the provided data.
*/

// Import the axios library, which is used for making HTTP requests
import axios from 'axios';

// Create an instance of axios with default configuration
const apiClient = axios.create({
  // The base URL for all HTTP requests
  baseURL: 'http://localhost:8000/user_api',
  // Default headers that will be sent with every request
  headers: {
    'Content-Type': 'application/json',
  },
  // Indicates whether or not cross-site Access-Control requests
  // should be made using credentials such as cookies or authorization headers
  withCredentials: true,
});

// Export an object containing methods for interacting with the API
export default {
  // Method for getting habit trackers by user ID
  getHabitTrackersByUserId(userId) {
    // Make a GET request to the habit trackers endpoint for a specific user
    return apiClient.get(`/users/${userId}/habit_trackers/`);
  },
  // Method for creating a new user
  createUser(userData) {
    // Make a POST request to the users endpoint with the user data
    return apiClient.post(`/users/`, userData);
  },
};