import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from './firebase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => console.log('User registered successfully'))
      .catch(error => console.error('Error registering user:', error));
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
