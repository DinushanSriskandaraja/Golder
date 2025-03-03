import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors"; // Import color constants

const TransactionsScreen = () => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
      <Text style={{ color: theme.text, fontSize: 20, fontWeight: "bold" }}>
        Transaction History
      </Text>
      {[...Array(10)].map((_, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            backgroundColor: theme.card,
            marginTop: 8,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: theme.text }}>Aug {i + 1}</Text>
          <Text style={{ color: theme.success }}>LKR {i * 1000}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TransactionsScreen;
