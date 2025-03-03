import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TransectionScreen from '../screens/TreansectionScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors } from '../constants/Colors'; // Import color constants
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.text }], // Set tab bar background
        tabBarActiveTintColor: theme.background,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: styles.tabIcon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome6 name="house" size={size} color={theme.background} solid />,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransectionScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome6 name="chart-simple" size={size} color={theme.background} solid />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome6 name="wallet" size={size} color={theme.background} solid />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome6 name="signature" size={size} color={theme.background} solid />,
        }}
      />
    </Tab.Navigator>
    
  );
}

// Custom styles for floating and centered tab bar
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 50,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 0,
  },
  tabIcon: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
