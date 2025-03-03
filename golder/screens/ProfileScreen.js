import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors"; // Import color constants
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing an edit icon from vector icons

const ProfileScreen = ({ navigation }) => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const userCards = [
    {
      cardName: "Visa",
      cardNumber: "1234 5678 9876 5432",
      expiryDate: "12/24",
      cardHolderName: "John Doe",
      image: {uri: 'https://via.placeholder.com/343x213/0000FF/FFFFFF?text=Visa+Card'}, // Replace with actual image
    },
    {
      cardName: "MasterCard",
      cardNumber: "2345 6789 8765 4321",
      expiryDate: "11/23",
      cardHolderName: "Jane Smith",
      image: {uri: 'https://via.placeholder.com/343x213/0000FF/FFFFFF?text=Visa+Card'}, // Replace with actual image
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
      {/* Profile Header */}
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: "bold" }}>
        Profile
      </Text>

      {/* Profile Picture and User Details */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.card,
          padding: 16,
          marginTop: 16,
          borderRadius: 12,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        {/* Profile Picture */}
        <Image
          source={{ uri: 'https://www.example.com/profile.jpg' }} // Replace with dynamic URL or local image
          style={{
            width: 80,   
            height: 80,  
            borderRadius: 40,  
            marginRight: 16,
            borderWidth: 3,    
            borderColor: theme.primary,
            shadowColor: theme.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          }}
        />

        {/* User Details */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.primary, fontSize: 18, fontWeight: "bold" }}>User Name</Text>
          <Text style={{ color: theme.text, fontSize: 16 }}>user@gmail.com</Text>
        </View>

        {/* Edit Icon */}
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <Icon name="edit" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* User Cards Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 24 }}>
        {userCards.map((card, index) => (
          <View key={index} style={[styles.card, { backgroundColor: theme.card }]}>
            <Image source={{ uri: card.image.uri }} style={styles.cardImage} />
            <Text style={[styles.cardTitle, { color: theme.primary }]}>{card.cardName}</Text>
            <Text style={[styles.cardNumber, { color: theme.text }]}>{card.cardNumber}</Text>
            <Text style={[styles.cardExpiry, { color: theme.text }]}>Expiry: {card.expiryDate}</Text>
            <Text style={[styles.cardHolder, { color: theme.text }]}>Holder: {card.cardHolderName}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Withdraw Button / Card with Navigation */}
      <TouchableOpacity
        style={[styles.withdrawButton, { backgroundColor: theme.b }]}
        onPress={() => navigation.navigate('WithdrawPage')} // Navigate to withdraw page
      >
        <Text style={[styles.buttonText, { color: theme.background }]}>
          Withdraw Funds
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 180,
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardNumber: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
    letterSpacing: 2,
  },
  cardExpiry: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  cardHolder: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  withdrawButton: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
