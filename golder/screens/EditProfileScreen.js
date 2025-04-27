import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [profilePic, setProfilePic] = useState(
    "https://example.com/default-profile-pic.jpg"
  );

  const handleChoosePhoto = async () => {
    // Request permission to access the photo library
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePic(result.uri); // Set selected image URI
      }
    } else {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your photos to choose a profile picture."
      );
    }
  };

  const handleSaveProfile = () => {
    Alert.alert(
      "Profile Updated",
      `Name: ${name}\nEmail: ${email}\nProfile Picture updated!`
    );
    // Here you can add logic to save the profile (e.g., update API, database, etc.)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.profilePicContainer}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <TouchableOpacity
          style={styles.changePicButton}
          onPress={handleChoosePhoto}>
          <Text style={styles.changePicText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePicButton: {
    padding: 10,
    backgroundColor: "#0066cc",
    borderRadius: 5,
  },
  changePicText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    padding: 15,
    backgroundColor: "#28a745",
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfileScreen;
