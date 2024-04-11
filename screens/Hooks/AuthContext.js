import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from AsyncStorage on component mount
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData !== null) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error loading userData from AsyncStorage:', error.message);
      }
    };

    loadUserData();
  }, []);

  const signIn = (user) => {
    if (user) {
      setUserData(user);
      AsyncStorage.setItem('userData', JSON.stringify(user));
    }
  };

  const signOut = () => {
    // Update state and AsyncStorage when signing out
    setUserData(null);
    AsyncStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ userData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
