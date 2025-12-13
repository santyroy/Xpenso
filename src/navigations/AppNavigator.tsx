import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppParamList } from '../types/navigation-types';
import AppTabNavigator from './AppTabNavigator';
import AddBudgetScreen from '../screens/app/AddBudgetScreen';
import AddTransactionScreen from '../screens/app/AddTransactionScreen';
import TransactionsScreen from '../screens/app/TransactionsScreen';

const Stack = createNativeStackNavigator<AppParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AppTabs"
      screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}
    >
      <Stack.Screen
        name="AppTabs"
        component={AppTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddBudget" component={AddBudgetScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
}
