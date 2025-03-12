import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = ({ navigation }) => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const userCards = [
    {
      cardName: "Visa",
      cardNumber: "1234 5678 9876 5432",
      expiryDate: "12/24",
      cardHolderName: "John Doe",
      image: { uri: "https://via.placeholder.com/343x213/1E90FF/FFFFFF?text=Visa" },
      bgColor:theme.highlight,
    },
    {
      cardName: "MasterCard",
      cardNumber: "2345 6789 8765 4321",
      expiryDate: "11/23",
      cardHolderName: "Jane Smith",
      image: { uri: "https://via.placeholder.com/343x213/FF4500/FFFFFF?text=MasterCard" },
      bgColor: theme.button,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Profile</Text>
      </View>

      {/* Profile Picture and User Details */}
      <View style={[styles.profileContainer, { backgroundColor: theme.card }]}>
        <Image
          source={{ uri: "https://www.example.com/profile.jpg" }}
          style={styles.profileImage}
        />
        <View style={styles.userDetails}>
          <Text style={[styles.userName, { color: theme.primary }]}>
            User Name
          </Text>
          <Text style={[styles.userEmail, { color: theme.textLight }]}>
            user@gmail.com
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="edit" size={26} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* User Cards Section */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Your Cards
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsContainer}
      >
        {userCards.map((card, index) => (
          <View
            key={index}
            style={[styles.card, { backgroundColor: card.bgColor }]}
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{card.cardName}</Text>
                <Image source={card.image} style={styles.cardLogo} />
              </View>
              <View style={styles.cardChip} />
              <Text style={styles.cardNumber}>{card.cardNumber}</Text>
              <View style={styles.cardDetails}>
                <View>
                  <Text style={styles.cardLabel}>Expires</Text>
                  <Text style={styles.cardExpiry}>{card.expiryDate}</Text>
                </View>
                <View>
                  <Text style={styles.cardLabel}>Card Holder</Text>
                  <Text style={styles.cardHolder}>{card.cardHolderName}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 24,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
    borderWidth: 4,
    borderColor: Colors.light.primary,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    marginTop: 6,
    opacity: 0.8,
  },
  editButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  cardsContainer: {
    marginBottom: 24,
  },
  card: {
    width: 300,
    height: 180,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardLogo: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  cardChip: {
    width: 40,
    height: 30,
    backgroundColor: "#D4AF37",
    borderRadius: 4,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardNumber: {
    fontSize: 18,
    fontFamily: "monospace",
    letterSpacing: 2,
    color: "#FFFFFF",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  cardExpiry: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardHolder: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ProfileScreen;