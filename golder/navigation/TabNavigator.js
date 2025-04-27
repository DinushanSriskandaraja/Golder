import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import TransectionScreen from "../screens/TreansectionScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import WalletScreen from "../screens/WalletScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BuyGoldScreen from "../screens/BuyGoldScreen"; // Internal screen
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";
import EditProfileScrren from "../screens/EditProfileScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Home Stack (For internal BuyGold navigation)
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      {/* <HomeStack.Screen name="EditProfile" component={EditProfileScrren} />
      <HomeStack.Screen name="Register" component={RegisterScreen} /> */}
    </HomeStack.Navigator>
  );
}
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <ProfileStack.Screen name="HomeMain" component={HomeScreen} /> */}
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />

      <ProfileStack.Screen name="EditProfile" component={EditProfileScrren} />
      {/* <ProfileStack.Screen name="Register" component={RegisterScreen} /> */}
      {/* <ProfileStack.Screen name="BuyGoldScreen" component={BuyGoldScreen} />
      <ProfileStack.Screen name="DeliveryScreen" component={DeliveryScreen} /> */}
    </ProfileStack.Navigator>
  );
}
// Tab Navigator (Post-Login)
// Tab Navigator (Post-Login)
function TabNavigator() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.card,
            shadowColor: theme.shadow || "#000",
          },
        ],
        tabBarActiveTintColor: theme.button,
        tabBarInactiveTintColor: theme.text,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "house";
              break;
            case "Transactions":
              iconName = "chart-simple";
              break;
            case "Wallet":
              iconName = "wallet";
              break;
            case "Profile":
              iconName = "signature";
              break;
          }

          return (
            <FontAwesome6
              name={iconName}
              size={22}
              color={focused ? theme.button : theme.text}
              solid
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Transactions" component={TransectionScreen} />
      {/* // <Tab.Screen name="Wallet" component={WalletScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

// Stack Navigator (Full App)
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="BuyGoldScreen" component={BuyGoldScreen} />
      <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    height: 75,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 10,
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 20,
    // backgroundColor: "#fff",
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 5,
  },

  tabIcon: { marginTop: 8, justifyContent: "center", alignItems: "center" },
});
