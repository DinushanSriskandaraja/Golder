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
  const [goldPrice, setGoldPrice] = useState(1850.25);
  const [total, setTotal] = useState(0);

  const weightOptions = ['0.5', '1', '2', '5'];
  const moneyOptions = ['100', '500', '1000', '5000'];

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
          <Text style={[styles.toggleText, { color: isByWeight ? theme.buttonText : theme.text }]}>By Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isByWeight && styles.activeToggle, { backgroundColor: !isByWeight ? theme.button : theme.card }]}
          onPress={() => { setIsByWeight(false); setInputValue(''); }}
        >
          <Text style={[styles.toggleText, { color: !isByWeight ? theme.buttonText : theme.text }]}>By Money</Text>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: theme.text }]}> {isByWeight ? 'Weight (oz)' : 'Amount (USD)'} </Text>
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
        contentContainerStyle={styles.presetList}
      />

      {/* Total and Buy Button */}
      <View style={styles.totalContainer}>
        <Text style={[styles.totalText, { color: theme.text }]}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.buyButton, { backgroundColor: theme.button }]}
          onPress={handleBuy}
          disabled={!inputValue || total <= 0}
        >
          <Text style={[styles.buyButtonText, { color: theme.buttonText }]}>Buy Now</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  activeToggle: {
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
  },
  presetList: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  presetButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 6,
  },
  presetText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buyButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BuyGoldScreen;
