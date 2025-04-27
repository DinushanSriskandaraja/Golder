import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors"; // Adjust as needed

const ProfileScreen = ({ navigation }) => {
  const colorScheme = useColorScheme() || "dark";
  const theme = Colors[colorScheme];

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "1234 Elm Street, Springfield, IL",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder image URL
    goldHolding: {
      weight: "15.3g",
      value: "$725",
    },
    transactions: [
      { id: "1", date: "Mar 01", amount: "5.2g", value: "$250" },
      { id: "2", date: "Feb 28", amount: "3.1g", value: "$150" },
      // More transactions...
    ],
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: theme.primary }]}>
        <Image
          source={{ uri: user.profileImage }}
          style={styles.profileImage}
        />
        <Text style={[styles.userName, { color: theme.text }]}>
          {user.name}
        </Text>
        <Text style={[styles.userEmail, { color: theme.text }]}>
          {user.email}
        </Text>
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: theme.button }]}
          onPress={() => navigation.navigate("EditProfile")} // Navigate to EditProfile screen
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Wallet Section */}
      <View style={[styles.detailsSection]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          My Wallet
        </Text>

        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <View style={[styles.goldInfo, { backgroundColor: theme.card }]}>
            <Text style={[styles.detailText, { color: theme.text }]}>
              Gold Holding:
            </Text>
            <Text style={[styles.goldValueText, { color: theme.text }]}>
              {user.goldHolding.weight}
            </Text>
          </View>
          <View style={[styles.goldInfo, { backgroundColor: theme.card }]}>
            <Text style={[styles.detailText, { color: theme.text }]}>
              Current Value:
            </Text>
            <Text style={[styles.goldValueText, { color: theme.text }]}>
              {user.goldHolding.value}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.deliverButton,
              { backgroundColor: theme.button, marginTop: 20 },
            ]}
            onPress={() => {
              // Handle gold delivery logic here
              console.log("Navigating to DeliveryScreen");

              navigation.navigate("DeliveryScreen");
            }}>
            <Text style={styles.deliverButtonText}>Deliver My Gold</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    borderRadius: 25, // More rounded corners
    paddingVertical: 50,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  profileImage: {
    width: 120, // Larger profile image
    height: 120,
    borderRadius: 60, // Big rounded
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 28, // Larger text size
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 18,
    marginBottom: 20,
    opacity: 0.8,
  },
  editButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30, // Larger rounded button
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  detailsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22, // Larger section titles
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    borderRadius: 20, // More rounded corners for cards
    padding: 25, // Increased padding for more space
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  goldInfo: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailText: {
    fontSize: 18, // Larger text for details
  },
  goldValueText: {
    fontSize: 22, // Bigger text for the gold value and weight
    fontWeight: "bold",
    marginTop: 5,
  },
  deliverButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  deliverButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
