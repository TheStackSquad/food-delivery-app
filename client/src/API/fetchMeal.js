// client/src/API/fetchMeal.js
import apiClient from '../frontendUtils/apiClient';

export const fetchMealsByCategory = async (category = 'all') => {
  console.log('fetch meals by category hit...');
  try {
    const response = await apiClient.get('/user/meals', {
      params: { category },
    });
    console.log('fetch meals by category hit...:', response.category);
    return response.data;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
};