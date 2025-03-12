import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, useColorScheme, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import GraphComponent from '../components/GraphComponent';
import { Colors } from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;

const priceData = [
  { id: '1', label: 'Gold per Gram', value: 'LKR 18,500' },
  { id: '2', label: 'Gold per Pawn', value: 'LKR 74,000' },
  { id: '3', label: 'USD to LKR', value: 'LKR 325' },
];

const HomeScreen = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const navigation = useNavigation(); // Hook to access navigation
  const handleBuyNow = () => {
    navigation.navigate('BuyGold'); // Navigate to BuyGold screen
  };
  return (
    <LinearGradient colors={[theme.background, theme.card]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Price Cards */}
        <FlatList
          data={priceData}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.priceList}
          renderItem={({ item }) => (
            <LinearGradient colors={[theme.card, theme.ctaCard]} style={styles.priceCard}>
              <Text style={[styles.priceLabel, { color: theme.text }]}>{item.label}</Text>
              <Text style={[styles.priceValue, { color: theme.button }]}>{item.value}</Text>
            </LinearGradient>
          )}
        />
{/* CTA */}<LinearGradient 
        colors={[theme.ctaCard, theme.card]} 
        style={styles.ctaCard}
      >
        <Text style={[styles.ctaText, { color: theme.text }]}>
          Start Investing in Gold Today!
        </Text>
        <TouchableOpacity 
          style={[styles.ctaButton, { backgroundColor: theme.button }]}
          onPress={handleBuyNow} // Add onPress handler
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </LinearGradient>
        {/* Graph */}
        <View style={styles.graphContainer}>
          <Text style={[styles.graphTitle, { color: theme.text }]}>Gold Price Trend</Text>
          <GraphComponent 
            data={[5000, 5200, 5100, 5300, 5400, 5500, 5600]} 
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} 
            // style={styles.graph}
          />
        </View>

        
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 , paddingBottom:70},
  scrollContent: { paddingTop: 50, paddingBottom: 20 },
  priceList: { paddingLeft: 20, marginVertical:20 },
  priceCard: {
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  priceLabel: { fontSize: 16, fontWeight: '500' },
  priceValue: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  graphContainer: { marginTop: 30, alignItems: 'center' },
  graphTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  graph: { width: screenWidth - 40, height: 360 },
  ctaCard: {
    borderRadius: 20,
    padding: 25,
    margin: 20,
    alignItems: 'center',
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  ctaText: { fontSize: 20, fontWeight: '600', marginBottom: 15 },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: { fontWeight: 'bold', fontSize: 18 },
});

export default HomeScreen;