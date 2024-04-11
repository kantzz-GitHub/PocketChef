import React from 'react';
import { Button } from 'react-native';
import CategoryScreen from './screens/CategoryScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MealsScreen from './screens/MealsScreen';
import RecipeScreen from './screens/RecipeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SavedScreen from './screens/SavedScreen';
import { AuthProvider } from './screens/Hooks/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} options={({ navigation }) => ({ headerRight: () => <SavedButton navigation={navigation} /> })} />
      <Stack.Screen name="Meals" component={MealsScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="Saved" component={SavedScreen} />
    </Stack.Navigator>
  )
}

const SavedButton = ({ navigation }) => (
  <Button
    title="Saved"
    onPress={() => navigation.navigate('Saved') }
  />
);
