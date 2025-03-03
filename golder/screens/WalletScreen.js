import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors"; // Import color constants

const WalletScreen = () => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
      <Text style={{ color: theme.text, fontSize: 20, fontWeight: "bold" }}>
        Wallet
      </Text>
      <View
        style={{
          backgroundColor: theme.card,
          padding: 16,
          marginTop: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: theme.primary }}>You Invested</Text>
        <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
          LKR 275,000.00
        </Text>
      </View>
    </View>
  );
};

export default WalletScreen;
