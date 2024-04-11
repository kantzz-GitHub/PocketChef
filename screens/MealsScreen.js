import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import fetchMealsByCategory from '../service/MealsFetcher';

const MealsScreen = ({ route, navigation }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsData = await fetchMealsByCategory(route.params.category);
        setMeals(mealsData);
      } catch (error) {
    
      }
    };

    fetchMeals();
  }, [route.params.category]);

  const navigateToRecipe = (mealId) => {
    navigation.navigate('Recipe', { mealId });
  };

  const renderMealItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToRecipe(item.idMeal)}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meals}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 4,
    width: '100%', 
    overflow: 'hidden',
  },
  image: {
    width: '100%', 
    aspectRatio: 16 / 9, 
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MealsScreen;