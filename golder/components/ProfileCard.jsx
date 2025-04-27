import React from "react";
import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { BlurView } from "expo-blur";

const ProfileCard = ({ profilePic, name, email }) => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  return (
    <View style={styles.wrapper}>
      <BlurView
        intensity={60}
        tint={colorScheme}
        style={[
          styles.card,
          { borderColor: theme.border || "rgba(255,255,255,0.1)" },
        ]}>
        <Image
          source={{ uri: profilePic || "https://i.pravatar.cc/300" }}
          style={styles.profilePic}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.email, { color: theme.text }]}>{email}</Text>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 24,
    overflow: "hidden",
  },
  card: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    backgroundColor: "rgba(255,255,255,0.05)", // fallback if BlurView doesn't work
  },
  profilePic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default ProfileCard;
