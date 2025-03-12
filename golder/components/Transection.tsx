import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from 'react-native';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: '1', type: 'credit', amount: 'LKR 5,000', date: '2025-03-06' },
  { id: '2', type: 'debit', amount: 'LKR 2,500', date: '2025-03-05' },
  { id: '3', type: 'credit', amount: 'LKR 10,000', date: '2025-03-04' },
];

const TransectionScreen = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.transactionItem, { backgroundColor: theme.card }]}>
            <Text style={[styles.amount, { color: item.type === 'credit' ? 'green' : 'red' }]}>
              {item.type === 'credit' ? '+' : '-'} {item.amount}
            </Text>
            <Text style={[styles.date, { color: theme.textSecondary }]}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TransectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  transactionItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    marginTop: 5,
  },
});
