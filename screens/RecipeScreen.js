import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import fetchRecipeById from '../service/RecipeFetcher';

const RecipeScreen = ({ route }) => {
  const { mealId } = route.params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await fetchRecipeById(mealId);
        setRecipe(recipeData);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchRecipe();
  }, [mealId]);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
  },
});

export default RecipeScreen;
