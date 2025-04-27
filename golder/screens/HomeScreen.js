import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors"; // Customize colors for dark theme
import ProfileCard from "@/components/ProfileCard";
import { getCurrentPrice } from "../services/priceService";
import { Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme() || "dark";
  const theme = Colors[colorScheme];
  // const navigation = useNavigation();

  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const data = await getCurrentPrice();
        const formattedData = [
          {
            id: "1",
            label: "Gold per Gram",
            value: `LKR ${
              data.price
                ? data.price.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })
                : "N/A"
            }`,
          },
          {
            id: "2",
            label: "Gold per Pawn",
            value: `LKR ${
              data.price
                ? (data.price * 8).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })
                : 0
            }`,
          },
        ];
        setPriceData(formattedData);
      } catch (error) {
        console.error("Error fetching price:", error);
        setPriceData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
  }, []);

  const handleBuyNow = () => {
    navigation.navigate("BuyGoldScreen");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileCard
          profilePic="https://example.com/profile.jpg"
          name="John Doe"
          email="john.doe@example.com"
        />

        {/* Price Cards */}
        {loading ? (
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading prices...
          </Text>
        ) : (
          <View style={styles.horizontalPriceList}>
            {priceData.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.sideBySidePriceCard,
                  { backgroundColor: theme.card },
                ]}>
                <Text style={[styles.priceLabel, { color: theme.text }]}>
                  {item.label}
                </Text>
                <Text style={[styles.priceValue, { color: theme.button }]}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* CTA 1: Buy Gold for Coffee */}
        <View style={[styles.ctaCard, { backgroundColor: theme.card }]}>
          <View style={styles.ctaRow}>
            <Text style={[styles.ctaText, { color: theme.text }]}>
              Buy Gold for the Price of a Coffee
            </Text>
            <Feather name="coffee" size={64} color={theme.button} />
          </View>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: theme.button }]}
            onPress={handleBuyNow}>
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              Just LKR 100
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.ctaCard, { backgroundColor: theme.card }]}>
          <View style={styles.ctaRow}>
            <Text style={[styles.ctaText, { color: theme.text }]}>
              Start Investing in Gold Today!
            </Text>
            <Feather name="bar-chart-2" size={64} color={theme.button} />
          </View>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: theme.button }]}
            onPress={handleBuyNow}>
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
        {/* CTA 3: Deliver My Gold */}
        <TouchableOpacity
          style={[styles.deliveryCard, { backgroundColor: theme.ctaCard }]}
          onPress={() => navigation.navigate("DeliveryScreen")}>
          <Text style={[styles.deliveryText, { color: theme.text }]}>
            Deliver My Gold To...
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 60, paddingBottom: 120 },

  // Price List
  horizontalPriceList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 15,
  },
  sideBySidePriceCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  priceLabel: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    opacity: 0.8,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 12,
    textAlign: "center",
  },

  // CTA Cards
  ctaCard: {
    borderRadius: 30,
    padding: 32,
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "left",
    lineHeight: 30,
  },
  ctaButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  ctaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    Width: "100%",
    // gap: 20,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  ctaIcon: {
    marginRight: 12,
  },

  // Delivery Card
  deliveryCard: {
    marginHorizontal: 20,
    marginTop: 40,
    padding: 25,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  deliveryText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  // Loading / Texts
  buttonText: { fontWeight: "bold", fontSize: 18 },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 30,
    fontStyle: "italic",
    opacity: 0.7,
  },
});

export default HomeScreen;
