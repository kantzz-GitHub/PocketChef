import axios from 'axios';

const fetchMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
};

export default fetchMealsByCategory;
