import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchCategories from '../service/CategoryFetcher';
import { firebase } from '../firebase';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.log("Failed to fetch", error)
      }
    };
    fetchData();

    // Check if user authentication state exists
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Category');
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login'); // Navigate to LoginScreen after logout
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
      <Text style={styles.title}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Log Out" onPress={handleLogout} />
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.idCategory}
        numColumns={2} 
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    elevation: 4,
    width: '45%', 
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryScreen;
