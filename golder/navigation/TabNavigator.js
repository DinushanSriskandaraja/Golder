import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome6 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TransectionScreen from '../screens/TreansectionScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BuyGoldScreen from '../screens/BuyGoldScreen'; // Internal screen
import LoginScreen from '../screens/Auth/LoginScreen'; 
import { Colors } from '../constants/Colors';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

// Home Stack (For internal BuyGold navigation)
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="BuyGold" component={BuyGoldScreen} />
    </HomeStack.Navigator>
  );
}

// Tab Navigator (Post-Login)
function TabNavigator() {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.card }],
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: styles.tabIcon,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator} 
        options={{ tabBarIcon: ({ size }) => <FontAwesome6 name="house" size={size} color={theme.text} solid /> }} 
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransectionScreen} 
        options={{ tabBarIcon: ({ size }) => <FontAwesome6 name="chart-simple" size={size} color={theme.text} solid /> }} 
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen} 
        options={{ tabBarIcon: ({ size }) => <FontAwesome6 name="wallet" size={size} color={theme.text} solid /> }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ size }) => <FontAwesome6 name="signature" size={size} color={theme.text} solid /> }} 
      />
    </Tab.Navigator>
  );
}

// Stack Navigator (Full App)
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}

// Styles
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
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: { fontSize: 12, fontWeight: '500', marginBottom: 0 },
  tabIcon: { marginTop: 8, justifyContent: 'center', alignItems: 'center' },
});
