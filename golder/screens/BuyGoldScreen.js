import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons"; // Make sure you install expo icons!

const { width } = Dimensions.get("window");

const BuyGoldScreen = () => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const [isByWeight, setIsByWeight] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [goldPrice, setGoldPrice] = useState(1850.25);
  const [total, setTotal] = useState(0);
  const maxSlide = width * 0.9; // max distance to slide

  const weightOptions = ["0.5", "1", "2", "5"];
  const moneyOptions = ["100", "500", "1000", "5000"];

  useEffect(() => {
    calculateTotal();
  }, [inputValue, isByWeight]);

  const calculateTotal = () => {
    const value = parseFloat(inputValue) || 0;
    if (isByWeight) {
      setTotal(value * goldPrice);
    } else {
      setTotal(value);
    }
  };

  const handlePresetSelect = (value) => {
    setInputValue(value);
  };

  const handleBuy = () => {
    const amount = isByWeight ? `${inputValue} oz` : `$${inputValue}`;
    Alert.alert(
      "Confirm Purchase",
      `Buy ${amount} of gold for $${total.toFixed(2)}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => Alert.alert("Success", "Purchase completed!"),
        },
      ]
    );
  };

  const renderPresetButton = (item) => (
    <TouchableOpacity
      style={[styles.presetButton, { backgroundColor: theme.card }]}
      onPress={() => handlePresetSelect(item)}>
      <Text style={[styles.presetText, { color: theme.text }]}>
        {isByWeight ? `${item} oz` : `$${item}`}
      </Text>
    </TouchableOpacity>
  );

  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = Math.min(Math.max(0, event.translationX), maxSlide);
    },
    onEnd: () => {
      if (translateX.value > maxSlide * 0.8) {
        runOnJS(handleBuy)();
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const buttonBackground = useAnimatedStyle(() => ({
    backgroundColor:
      translateX.value > maxSlide * 0.8 ? "#4CAF50" : theme.button,
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        // colors={[theme.background, theme.card]}
        style={[styles.container, { backgroundColor: theme.background }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <View style={styles.contentWrapper}>
            {/* Toggle Buttons */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  { backgroundColor: isByWeight ? theme.button : theme.card },
                ]}
                onPress={() => {
                  setIsByWeight(true);
                  setInputValue("");
                }}>
                <Text
                  style={[
                    styles.toggleText,
                    { color: isByWeight ? theme.buttonText : theme.text },
                  ]}>
                  By Weight
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  { backgroundColor: !isByWeight ? theme.button : theme.card },
                ]}
                onPress={() => {
                  setIsByWeight(false);
                  setInputValue("");
                }}>
                <Text
                  style={[
                    styles.toggleText,
                    { color: !isByWeight ? theme.buttonText : theme.text },
                  ]}>
                  By Money
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                {isByWeight ? "Weight (oz)" : "Amount (USD)"}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.text, color: theme.text },
                ]}
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                placeholder={isByWeight ? "Enter ounces" : "Enter dollars"}
                placeholderTextColor={theme.text + "80"}
              />
            </View>

            {/* Preset Buttons */}
            <View style={styles.presetGrid}>
              {(isByWeight ? weightOptions : moneyOptions).map(
                (item, index) => (
                  <View key={index} style={styles.presetWrapper}>
                    {renderPresetButton(item)}
                  </View>
                )
              )}
            </View>

            <View style={styles.slideOuterContainer}>
              <Animated.View style={[styles.backgroundBar, buttonBackground]} />
              <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[styles.slider, animatedStyle]}>
                  <Ionicons name="arrow-forward" size={24} color="white" />
                </Animated.View>
              </PanGestureHandler>
              <Text style={[styles.slideText, { color: theme.buttonText }]}>
                Slide to Buy
              </Text>
            </View>
            {/* Total */}
            <View style={styles.totalContainer}>
              <Text style={[styles.totalText, { color: theme.text }]}>
                Total: ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 10,
    elevation: 3,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  presetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  presetWrapper: {
    width: "48%",
    marginBottom: 12,
  },
  presetButton: {
    paddingVertical: 14,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  presetText: {
    fontSize: 16,
    fontWeight: "600",
  },
  slideOuterContainer: {
    width: width * 0.9,
    height: 60,
    backgroundColor: "#ccc",
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ccc",
  },
  slider: {
    position: "absolute",
    left: 0,
    width: 60,
    height: 60,
    backgroundColor: "#555",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  slideText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default BuyGoldScreen;
