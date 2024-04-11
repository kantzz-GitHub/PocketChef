// RecipeFetcher.js
const fetchRecipeById = async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      return data.meals[0]; // Return the first meal object
    } catch (error) {
      throw new Error('Failed to fetch recipe');
    }
  };
  
  export default fetchRecipeById;
  