import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'; // Adjust the import path as needed

const TransactionScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Bought');
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Sample data with more items
  const boughtTransactions = [
    { id: '1', date: 'Mar 01', amount: '5.2g', value: '$250' },
    { id: '2', date: 'Feb 28', amount: '3.1g', value: '$150' },
    { id: '3', date: 'Feb 27', amount: '2.0g', value: '$95' },
    { id: '4', date: 'Feb 25', amount: '4.5g', value: '$220' },
    { id: '5', date: 'Feb 20', amount: '1.8g', value: '$85' },
    { id: '9', date: 'Feb 15', amount: '3.0g', value: '$140' },
    { id: '10', date: 'Feb 10', amount: '2.5g', value: '$120' },
    { id: '11', date: 'Feb 05', amount: '4.0g', value: '$190' },
    { id: '12', date: 'Jan 30', amount: '1.5g', value: '$70' },
    { id: '13', date: 'Jan 25', amount: '5.0g', value: '$240' },
    { id: '14', date: 'Jan 20', amount: '2.8g', value: '$130' },
  ];

  const withdrawnTransactions = [
    { id: '6', date: 'Mar 03', amount: '2.5g', value: '$120' },
    { id: '7', date: 'Feb 25', amount: '4.0g', value: '$195' },
    { id: '15', date: 'Feb 18', amount: '3.5g', value: '$170' },
    { id: '16', date: 'Feb 12', amount: '1.0g', value: '$50' },
    { id: '17', date: 'Feb 08', amount: '2.0g', value: '$95' },
    { id: '18', date: 'Jan 28', amount: '4.5g', value: '$220' },
    { id: '19', date: 'Jan 15', amount: '3.0g', value: '$145' },
  ];

  const pendingTransactions = [
    { id: '8', date: 'Mar 06', amount: '1.8g', value: '$87' },
    { id: '20', date: 'Mar 04', amount: '2.2g', value: '$105' },
    { id: '21', date: 'Mar 02', amount: '3.8g', value: '$180' },
    { id: '22', date: 'Feb 26', amount: '1.5g', value: '$72' },
    { id: '23', date: 'Feb 22', amount: '2.0g', value: '$95' },
  ];

  const categories = [
    { name: 'Bought', icon: 'cart-outline', data: boughtTransactions },
    { name: 'Withdrawn', icon: 'cash-outline', data: withdrawnTransactions },
    { name: 'Pending', icon: 'hourglass-outline', data: pendingTransactions },
  ];

  // Animation
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedCategory]);

  // Transaction Item
  const TransactionItem = ({ date, amount, value }) => (
    <View style={[styles.transactionItem, { backgroundColor: colors.card }]}>
      <View style={styles.dateContainer}>
        <Text style={[styles.dateText, { color: colors.text }]}>{date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amountText, { color: colors.button }]}>{amount}</Text>
        <Text style={[styles.valueText, { color: colors.textSecondary }]}>{value}</Text>
      </View>
    </View>
  );

  // Category Tab
  const CategoryTab = ({ name, icon, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.tab, isSelected && { backgroundColor: `${colors.button}20` }]}
      onPress={onPress}
    >
      <View style={[styles.tabIconContainer, { backgroundColor: isSelected ? colors.button : colors.textSecondary }]}>
        <Ionicons
          name={icon}
          size={24}
          color="#FFF"
        />
      </View>
      <Text style={[styles.tabText, { color: isSelected ? colors.button : colors.textSecondary }]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory)?.data || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Gold Vault</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: colors.background }]}>
        {categories.map(category => (
          <CategoryTab
            key={category.name}
            name={category.name}
            icon={category.icon}
            isSelected={selectedCategory === category.name}
            onPress={() => {
              fadeAnim.setValue(0);
              setSelectedCategory(category.name);
            }}
          />
        ))}
      </View>

      {/* Transactions List */}
      <Animated.View style={[styles.listContainer, { opacity: fadeAnim,backgroundColor:colors.background, borderColor: colors.button }]}>
        {selectedCategoryData.length > 0 ? (
          <FlatList
            data={selectedCategoryData}
            renderItem={({ item }) => (
              <TransactionItem
                date={item.date}
                amount={item.amount}
                value={item.value}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <Text style={[styles.noTransactions, { color: colors.textSecondary }]}>
            No transactions yet
          </Text>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    borderRadius: 30,
    padding: 20,
    marginBottom:80,
    borderWidth: 2,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 70,
    padding: 4,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 15,
    padding: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 16,
    marginTop: 4,
    opacity: 0.8,
  },
  noTransactions: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
});

export default TransactionScreen;