// import React from 'react';
// import { StyleSheet } from 'react-native';
// import CategoryScreen from './screens/CategoryScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignUpScreen from './screens/SignUpScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Add AsyncStorage import
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { firebase } from './firebase';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StackNavigation />
//     </NavigationContainer>
//   );
// }

// function StackNavigation() {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//       <Stack.Screen
//         name="Category"
//         component={CategoryScreen}
//         options={{
//           headerShown: false, // Hide the default header
//         }}
//       />
//     </Stack.Navigator>
//   )
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './screens/Hooks/AuthContext';
import CategoryScreen from './screens/CategoryScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{ headerShown: false }} // Hide the default header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

