import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from './firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => console.log('User logged in successfully'))
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
