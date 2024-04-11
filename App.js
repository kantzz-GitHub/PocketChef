import React from 'react';
import { StyleSheet } from 'react-native';
import CategoryScreen from './screens/CategoryScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
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
      {/* Pass navigation prop to CategoryScreen */}
      <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
