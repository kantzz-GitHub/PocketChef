import React from 'react';
import CategoryScreen from './screens/CategoryScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MealsScreen from './screens/MealsScreen';
import RecipeScreen from './screens/RecipeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Add AsyncStorage import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './firebase';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Meals" component={MealsScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  )
}