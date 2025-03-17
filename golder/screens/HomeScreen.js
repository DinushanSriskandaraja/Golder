import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import GraphComponent from '../components/GraphComponent';
import { Colors } from '../constants/Colors';
import { getCurrentPrice, getExchangeRate } from '../services/priceService'; // Import from root

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const navigation = useNavigation();

  // State for price data from API
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch current price from backend
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const data = await getCurrentPrice(); // Fetch from priceApi.js
        const rate=await getExchangeRate();
        // Format the API response into FlatList-compatible data
        const formattedData = [
          {
            id: '1',
            label: 'Gold per Gram',
            value: `LKR ${data.price ? data.price.toLocaleString('en-US', { maximumFractionDigits: 2 }) : 'N/A'}`,
          },
          {
            id: '2',
            label: 'Gold per Pawn',
            value: `LKR ${(data.price ? data.price * 8 : 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}` || 'N/A', // Assuming 1 pawn = 8 grams
          },
          {
            id: '3',
            label: 'USD to LKR',
            value: `LKR ${rate.exchange_rate? rate.exchange_rate.toLocaleString('en-US', { maximumFractionDigits: 2 }) : 'N/A'}`,
          },
        ];
  
        setPriceData(formattedData);
      } catch (error) {
        console.error('Error fetching price:', error);
        // Fallback to empty array on error
        setPriceData([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPrice();
  }, []);
  

  const handleBuyNow = () => {
    navigation.navigate('BuyGold'); // Navigate to BuyGold screen
  };

  return (
    <LinearGradient colors={[theme.background, theme.card]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Price Cards */}
        {loading ? (
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading prices...</Text>
        ) : (
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
        )}

        {/* CTA */}
        <LinearGradient colors={[theme.ctaCard, theme.card]} style={styles.ctaCard}>
          <Text style={[styles.ctaText, { color: theme.text }]}>
            Start Investing in Gold Today!
          </Text>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: theme.button }]}
            onPress={handleBuyNow}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>Buy Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Graph */}
        <View style={styles.graphContainer}>
          <Text style={[styles.graphTitle, { color: theme.text }]}>Gold Price Trend</Text>
          <GraphComponent
            data={[5000, 5200, 5100, 5300, 5400, 5500, 5600]} // Static for now
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 70 },
  scrollContent: { paddingTop: 50, paddingBottom: 20 },
  priceList: { paddingLeft: 20, marginVertical: 20 },
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
  ctaCard: {
    borderRadius: 20,
    padding: 25,
    margin: 20,
    alignItems: 'center',
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
  loadingText: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
});

export default HomeScreen;