import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { signup } from "@/services//authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const [nic, setNic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      // const response = await signup({ nic, name, email, address, password });

      // Navigate to Main screen or Login screen based on your flow
      navigation.replace("Main");

      // Optional: success message
      setMessage(`Welcome, ${name}!`);
    } catch (error) {
      // Proper error display
      const errorMsg =
        typeof error === "string" ? error : error?.message || "Signup failed";
      setMessage(errorMsg);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          Create Account
        </Text>

        <TextInput
          label="NIC"
          value={nic}
          onChangeText={setNic}
          mode="outlined"
          style={styles.input}
          theme={inputTheme(theme)}
        />
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          theme={inputTheme(theme)}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          theme={inputTheme(theme)}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          mode="outlined"
          style={styles.input}
          theme={inputTheme(theme)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={inputTheme(theme)}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          style={[styles.button, { backgroundColor: theme.button }]}
          labelStyle={{ color: theme.buttonText }}>
          Register
        </Button>

        {message ? (
          <Text style={{ color: "red", marginTop: 10 }}>{message}</Text>
        ) : null}

        {/* <Button
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 20, color: theme.text }}>
          Already have an account? Login
        </Button> */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.loginText, { color: theme.text }]}>
            Already have an account?{" "}
            <Text style={{ color: theme.button }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const inputTheme = (theme) => ({
  colors: {
    primary: theme.button,
    text: theme.text,
    background: theme.card,
    onSurface: theme.text,
    placeholder: theme.textSecondary,
  },
  roundness: 12,
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    padding: 25,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    paddingVertical: 12,

    // paddingVertical: 10,
    borderRadius: 25,
  },
  loginText: {
    fontSize: 14,
    textAlign: "center",
  },
});
