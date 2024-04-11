import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../firebase'; 
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

  const handleSave = async () => {
    if (!firebase.auth().currentUser) {
      // User not logged in, handle accordingly
      return;
    }

    const userId = firebase.auth().currentUser.uid;
    try {
      const firestore = firebase.firestore();
      await firestore.collection('savedMeals').doc(userId).collection('meals').add({
        mealId: mealId,
        mealName: recipe.strMeal,
        thumbnail: recipe.strMealThumb,
      });
  
      // Success message or navigation to another screen
      console.log('Meal saved successfully!');
      Alert.alert('Success', 'Meal saved successfully!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } catch (error) {
      // Handle error
      console.error('Error saving meal: ', error);
    }
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{padding: 16}}>
        <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={handleSave}>
        <Icon name="save" size={24} color="#fff" />
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
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
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    backgroundColor: '#28a745',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default RecipeScreen;
