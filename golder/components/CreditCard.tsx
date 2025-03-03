import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";

// Define the type for each card in the row
interface Card {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cardHolderName: string;
  image: ImageSourcePropType;
}

// Define the props for the CreditCardRow component
interface CreditCardRowProps {
  cards: Card[];
}

const CreditCardRow: React.FC<CreditCardRowProps> = ({ cards }) => {
  return (
    <View style={styles.cardRow}>
      {cards.map((card, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image source={card.image} style={styles.cardLogo} />
          <Text style={styles.cardName}>{card.cardName}</Text>
          <Text style={styles.cardHolderName}>{card.cardHolderName}</Text>
          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>
              **** **** **** {card.cardNumber.slice(-4)}
            </Text>
          </View>
          <View style={styles.cardExpiryContainer}>
            <Text style={styles.cardExpiry}>{card.expiryDate}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cardContainer: {
    width: 343,  // Realistic card width (85.60mm * 4px = 343px)
    height: 213, // Realistic card height (53.98mm * 4px = 213px)
    backgroundColor: "#1f2a44", // Dark background for a modern card look
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardLogo: {
    width: 60, // Adjusted logo size
    height: 60, // Adjusted logo size
    resizeMode: "contain",
  },
  cardName: {
    fontSize: 18,
    color: "#fff", // White text for contrast
    fontWeight: "bold",
  },
  cardHolderName: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },
  cardNumberContainer: {
    marginTop: 10,
  },
  cardNumber: {
    fontSize: 18,
    color: "#fff",
    letterSpacing: 2, // Space between the numbers for a card effect
  },
  cardExpiryContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardExpiry: {
    fontSize: 14,
    color: "#fff",
  },
});

export default CreditCardRow;
