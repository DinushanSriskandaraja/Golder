import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { login } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const handleLogin = async () => {
    try {
      // const response = await login({ email, password });
      // await AsyncStorage.setItem("token", response.token);
      navigation.replace("Main");
      setMessage(`Welcome back!`);
    } catch (error) {
      setMessage(error || "Login failed");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>

        {message !== "" && (
          <Text style={[styles.message, { color: theme.button }]}>
            {message}
          </Text>
        )}

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
              placeholder: theme.text,
              background: theme.card,
            },
            roundness: 20,
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
              placeholder: theme.text,
              background: theme.card,
            },
            roundness: 20,
          }}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={[styles.button, { backgroundColor: theme.button }]}
          labelStyle={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.buttonText,
          }}>
          Login
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[styles.registerText, { color: theme.text }]}>
            Don’t have an account?{" "}
            <Text style={{ color: theme.button }}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 30,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    marginBottom: 18,
    borderRadius: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    textAlign: "center",
  },
});
