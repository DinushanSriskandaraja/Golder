import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, useColorScheme, Dimensions } from 'react-native';
import GraphComponent from '../components/GraphComponent';
import { Colors } from '../constants/Colors'; // Ensure this file exists

const screenWidth = Dimensions.get("window").width;

// Dummy data for prices
const priceData = [
  { id: '1', label: 'Gold per Gram', value: 'LKR 18,500' },
  { id: '2', label: 'Gold per Pawn', value: 'LKR 74,000' },
  { id: '3', label: 'USD to LKR', value: 'LKR 325' },
];

const HomeScreen = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] || Colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>      
      {/* Scrollable Price Cards */}
      <FlatList
        data={priceData}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.priceList}
        renderItem={({ item }) => (
          <View style={[styles.priceCard, { backgroundColor: theme.text }]}>            
            <Text style={[styles.priceLabel, { color: theme.background }]}>{item.label}</Text>
            <Text style={[styles.priceValue, { color: theme.background }]}>{item.value}</Text>
          </View>
        )}
      />
      
      {/* Graph */}
      <View style={styles.graphContainer}>
        <Text style={[styles.graphTitle, { color: theme.text }]}>Gold Price Trend</Text>
        <GraphComponent 
          data={[5000, 5200, 5100, 5300, 5400, 5500, 5600]} 
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} 
        />
      </View>

      {/* CTA Card */}
      <View style={[styles.ctaCard, { backgroundColor: theme.ctaCard }]}>        
        <Text style={[styles.ctaText, { color: theme.text }]}>Start Investing in Gold Today!</Text>
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: theme.button }]}>          
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  priceList: {
    paddingLeft: 20,
  },
  priceCard: {
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    width: 150,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  graphContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ctaCard: {
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 18,
    marginBottom: 10,
  },
  ctaButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;