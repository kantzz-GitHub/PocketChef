import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const SavedScreen = () => {
  const [savedMeals, setSavedMeals] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSavedMeals = async () => {
      try {
        const userId = firebase.auth().currentUser?.uid;
        if (userId) {
          const firestore = firebase.firestore();
          const snapshot = await firestore.collection('savedMeals').doc(userId).collection('meals').get();
          const meals = snapshot.docs.map(doc => doc.data());
          setSavedMeals(meals);
        }
      } catch (error) {
        console.error('Error fetching saved meals:', error);
      }
    };

    fetchSavedMeals();
  }, []);

  const handleMealPress = (mealId, isSaved) => {
    navigation.navigate('Recipe', { mealId, isSaved });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedMeals}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMealPress(item.mealId, true)}>
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <Text style={styles.mealName}>{item.mealName}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SavedScreen;
