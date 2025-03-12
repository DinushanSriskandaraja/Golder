import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { useColorScheme } from 'react-native';

const BuyGoldScreen = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  
  const [isByWeight, setIsByWeight] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [goldPrice, setGoldPrice] = useState(1850.25); // USD per ounce
  const [total, setTotal] = useState(0);

  const weightOptions = ['0.5', '1', '2', '5']; // oz
  const moneyOptions = ['100', '500', '1000', '5000']; // USD

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
      'Confirm Purchase',
      `Buy ${amount} of gold for $${total.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => Alert.alert('Success', 'Purchase completed!') }
      ]
    );
  };

  const renderPresetButton = ({ item }) => (
    <TouchableOpacity
      style={[styles.presetButton, { backgroundColor: theme.card }]}
      onPress={() => handlePresetSelect(item)}
    >
      <Text style={[styles.presetText, { color: theme.text }]}>
        {isByWeight ? `${item} oz` : `$${item}`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[theme.background, theme.card]} style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Buy Gold</Text>

      {/* Toggle Switch */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isByWeight && styles.activeToggle, { backgroundColor: isByWeight ? theme.button : theme.card }]}
          onPress={() => { setIsByWeight(true); setInputValue(''); }}
        >
          <Text style={[styles.toggleText, { color: isByWeight ? theme.buttonText : theme.text }]}>
            By Weight
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isByWeight && styles.activeToggle, { backgroundColor: !isByWeight ? theme.button : theme.card }]}
          onPress={() => { setIsByWeight(false); setInputValue(''); }}
        >
          <Text style={[styles.toggleText, { color: !isByWeight ? theme.buttonText : theme.text }]}>
            By Money
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: theme.text }]}>
          {isByWeight ? 'Weight (oz)' : 'Amount (USD)'}
        </Text>
        <TextInput
          style={[styles.input, { borderColor: theme.text, color: theme.text }]}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder={isByWeight ? 'Enter ounces' : 'Enter dollars'}
          placeholderTextColor={theme.text + '80'}
        />
      </View>

      {/* Preset Options */}
      <FlatList
        data={isByWeight ? weightOptions : moneyOptions}
        renderItem={renderPresetButton}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.presetList} // Updated to use contentContainerStyle
      />

      {/* Total and Buy Button */}
      <View style={styles.totalContainer}>
        <Text style={[styles.totalText, { color: theme.text }]}>
          Total: ${total.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={[styles.buyButton, { backgroundColor: theme.button }]}
          onPress={handleBuy}
          disabled={!inputValue || total <= 0}
        >
          <Text style={[styles.buyButtonText, { color: theme.buttonText }]}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeToggle: {
    elevation: 5,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  presetList: {
    paddingHorizontal: 20, // Equal padding on both sides
    justifyContent: 'center', // Center the buttons horizontally
    // maxHeight:50
    // marginBottom: 25,
  },
  presetButton: {
    paddingVertical: 6, // Reduced height from 10 to 6
    paddingHorizontal: 15, // Consistent horizontal padding
    borderRadius: 8, // Slightly smaller radius for compactness
    marginRight: 10, // Space between buttons
    elevation: 2,
  },
  presetText: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalContainer: {
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buyButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuyGoldScreen;