import { StyleSheet } from 'react-native';
import CategoryScreen from './screens/CategoryScreen';
import MealsScreen from './screens/MealsScreen';
import RecipeScreen from './screens/RecipeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Meals" component={MealsScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
