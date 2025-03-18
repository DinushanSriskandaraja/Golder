import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { login } from '@/services/authService';
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // const login = async () => {
  //   try {
  //     const response = await axios.post('http://192.168.8.105:5000/auth/login', { email, password }); // Replace with your IP
  //     console.log('Token:', response.data.token);
  //     await AsyncStorage.setItem('token', response.data.token);
  //     navigation.replace('Main');
  //   } catch (error) {
  //     console.error('Login error:', error.message);
  //     alert('Login failed—check credentials or server');
  //   }
  // };
  const handleLogin = async () => {
    try {
      const response = await login({ email, password });

      navigation.replace('Main');
  setMessage(`Welcome, ${response.email}!`);
    } catch (error) {
      setMessage(error || 'Login failed');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          theme={{ 
            colors: { 
              primary: theme.button, 
              text: theme.text, 
              background: theme.card, 
              onSurface: theme.text, 
              placeholder: theme.textSecondary 
            }, 
            roundness: 12 
          }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          theme={{ 
            colors: { 
              primary: theme.button, 
              text: theme.text, 
              background: theme.card, 
              onSurface: theme.text, 
              placeholder: theme.textSecondary 
            }, 
            roundness: 12 
          }}
        />
        <Button
          mode="contained"
          onPress={handleLogin}
          style={[styles.button, { backgroundColor: theme.button }]}
          labelStyle={{ color: theme.buttonText }}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 12,
  },
});