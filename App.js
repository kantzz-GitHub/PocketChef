import React from 'react';
import { ActivityIndicator, Button } from 'react-native';
import CategoryScreen from './screens/CategoryScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MealsScreen from './screens/MealsScreen';
import RecipeScreen from './screens/RecipeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SavedScreen from './screens/SavedScreen';
import { AuthProvider, useAuth } from './screens/Hooks/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

function AppNavigator() {
  const { userData, signOut, loading } = useAuth();

  if (loading) {
    return (<ActivityIndicator size="large" color="#0000ff" />);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userData ? "Category" : "Login"}>
        {userData ? (
          <>
            <Stack.Screen name="Category" component={CategoryScreen} options={({ navigation }) => ({ headerRight: () => <SavedButton navigation={navigation} /> })} />
            <Stack.Screen name="Meals" component={MealsScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
            <Stack.Screen name="Saved" component={SavedScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const SavedButton = ({ navigation }) => (
  <Button
    title="Saved"
    onPress={() => navigation.navigate('Saved')}
  />
);
