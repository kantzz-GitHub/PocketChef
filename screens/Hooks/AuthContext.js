import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData !== null) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error loading userData from AsyncStorage:', error.message);
      } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
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
    setUserData(null);
    AsyncStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ userData, loading, signIn, signOut }}>
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
