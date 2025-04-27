import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useColorScheme,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const DeliveryScreen = ({ navigation }) => {
  const colorScheme = useColorScheme() || "dark";
  const theme = Colors[colorScheme];

  const [customWeight, setCustomWeight] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});

  const deliveryOptions = [
    { id: "1", weight: "1g" },
    { id: "2", weight: "2g" },
    { id: "3", weight: "4g" },
    { id: "4", weight: "8g" },
  ];

  const increaseQuantity = (optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: (prev[optionId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (optionId) => {
    setSelectedOptions((prev) => {
      if (prev[optionId] && prev[optionId] > 1) {
        return { ...prev, [optionId]: prev[optionId] - 1 };
      } else {
        const updated = { ...prev };
        delete updated[optionId];
        return updated;
      }
    });
  };

  const handleConfirmDelivery = () => {
    const selectedWeights = Object.entries(selectedOptions)
      .map(([id, quantity]) => {
        const option = deliveryOptions.find((opt) => opt.id === id);
        return option ? `${quantity} x ${option.weight}` : null;
      })
      .filter(Boolean)
      .join(", ");

    if (customWeight && selectedWeights) {
      alert(
        `You requested ${customWeight}g + selected (${selectedWeights}) for delivery.`
      );
    } else if (customWeight) {
      alert(`You requested ${customWeight}g of gold for delivery.`);
    } else if (selectedWeights) {
      alert(`You selected (${selectedWeights}) for delivery.`);
    } else {
      alert("Please select or enter an amount for delivery.");
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ paddingBottom: 85, paddingTop: 40 }}>
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          {deliveryOptions.map((option) => {
            const quantity = selectedOptions[option.id] || 0;
            return (
              <View
                key={option.id}
                style={[
                  styles.optionCard,
                  {
                    backgroundColor:
                      quantity > 0 ? theme.button : theme.cardBackground,
                    borderWidth: quantity > 0 ? 2 : 0,
                    borderColor: quantity > 0 ? "#FFD700" : "transparent",
                  },
                ]}>
                <View
                  style={[
                    styles.coinContainer,
                    { backgroundColor: quantity > 0 ? "#fff7cc" : "#FFF8DC" },
                  ]}>
                  <FontAwesome6
                    name="coins"
                    style="solid"
                    size={50}
                    color="#FFD700"
                  />
                </View>
                <Text
                  style={[
                    styles.weightText,
                    { color: quantity > 0 ? theme.background : theme.text },
                  ]}>
                  {option.weight}
                </Text>

                {/* + and - buttons */}
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => decreaseQuantity(option.id)}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={[styles.quantityText, { color: theme.text }]}>
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => increaseQuantity(option.id)}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Selected Items Preview */}
        {Object.keys(selectedOptions).length > 0 && (
          <View style={styles.selectedInfo}>
            <Text
              style={[
                styles.selectedText,
                { color: theme.text, marginBottom: 10 },
              ]}>
              Selected Items:
            </Text>

            {/* Table Headers */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, { color: theme.text }]}>
                Weight
              </Text>
              <Text style={[styles.tableHeader, { color: theme.text }]}>
                Quantity
              </Text>
              <Text style={[styles.tableHeader, { color: theme.text }]}>
                Subtotal
              </Text>
            </View>

            {/* Table Rows */}
            {Object.entries(selectedOptions).map(([id, quantity]) => {
              const option = deliveryOptions.find((opt) => opt.id === id);
              const weightValue = option
                ? parseFloat(option.weight.replace("g", ""))
                : 0;
              const subtotalWeight = (quantity * weightValue).toFixed(2);
              return (
                <View key={id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { color: theme.text }]}>
                    {option?.weight}
                  </Text>
                  <Text style={[styles.tableCell, { color: theme.text }]}>
                    {quantity}
                  </Text>
                  <Text style={[styles.tableCell, { color: theme.text }]}>
                    {subtotalWeight}g
                  </Text>
                </View>
              );
            })}

            {/* Total Row */}
            <View
              style={[
                styles.tableRow,
                {
                  borderTopWidth: 1,
                  borderColor: "#ccc",
                  marginTop: 10,
                  paddingTop: 10,
                },
              ]}>
              <Text
                style={[
                  styles.tableCell,
                  { color: theme.text, fontWeight: "bold" },
                ]}>
                Total
              </Text>
              <Text style={[styles.tableCell]}></Text>
              <Text
                style={[
                  styles.tableCell,
                  { color: theme.text, fontWeight: "bold" },
                ]}>
                {Object.entries(selectedOptions)
                  .reduce((total, [id, quantity]) => {
                    const option = deliveryOptions.find((opt) => opt.id === id);
                    const weightValue = option
                      ? parseFloat(option.weight.replace("g", ""))
                      : 0;
                    return total + quantity * weightValue;
                  }, 0)
                  .toFixed(2)}
                g
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: theme.button }]}
          onPress={handleConfirmDelivery}>
          <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 70,
    padding: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  optionCard: {
    width: "45%",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  coinContainer: {
    padding: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  weightText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  customInputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
  },

  selectedInfo: {
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  counterButton: {
    backgroundColor: "#FFD700",
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 10,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default DeliveryScreen;
