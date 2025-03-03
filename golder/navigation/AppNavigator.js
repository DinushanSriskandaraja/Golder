import { createStackNavigator } from '@react-navigation/stack';
// import ProfileScreen from '../screens/ProfileScreen';
import WithdrawPage from '../screens/WithdrawScreen'; // Import the WithdrawPage component

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      <Stack.Screen name="WithdrawPage" component={WithdrawPage} />
    </Stack.Navigator>
  );
};
export default AppNavigator;