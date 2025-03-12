import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { PieChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const WalletScreen = () => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <Text style={[styles.header, { color: theme.text }]}>My Wallet</Text>

      {/* Total Investment Section */}
      <LinearGradient
        colors={[theme.background, theme.card]} // Deep blue gradient for better visibility
        style={styles.walletCard}
      >
        <Text style={styles.walletTitle}>Total Investment</Text>

        <View style={styles.investmentRow}>
          <View style={styles.investmentBox}>
            <Text style={styles.investmentLabel}>Amount</Text>
            <Text style={styles.investmentValue}>LKR 275,000.00</Text>
          </View>
          <View style={styles.investmentBox}>
            <Text style={styles.investmentLabel}>Gold Weight</Text>
            <Text style={styles.investmentValue}>10.5g</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Portfolio Breakdown */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Portfolio Breakdown
        </Text>

        {/* Pie Chart */}
        <PieChart
          data={[
            { name: "Gold", population: 80, color: "#F2C94C", legendFontColor: theme.text, legendFontSize: 14 },
            { name: "Cash Reserve", population: 20, color: "#E0E0E0", legendFontColor: theme.text, legendFontSize: 14 },
          ]}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            backgroundColor: theme.card,
            backgroundGradientFrom: theme.card,
            backgroundGradientTo: theme.card,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          style={styles.chart}
        />
      </View>

      {/* Profit/Loss Trend */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Profit/Loss Trend
        </Text>

        <BarChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{ data: [2, 3, -1, 5, 4] }],
          }}
          width={screenWidth - 40}
          height={180}
          yAxisLabel="% "
          chartConfig={{
            backgroundGradientFrom: theme.card,
            backgroundGradientTo: theme.card,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => theme.text,
            style: { borderRadius: 10 },
          }}
          style={[styles.chart, { marginBottom: 10 }]}
        />
      </View>

      
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
        paddingBottom:50,

  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  walletCard: {
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  walletTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  investmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  investmentBox: {
    flex: 1,
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  investmentLabel: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.8,
  },
  investmentValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  chart: {
    alignSelf: "center",
    borderRadius: 10,

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingBottom:20
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
