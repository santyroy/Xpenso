import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppParamList } from '../types/navigation-types';
import AppTabNavigator from './AppTabNavigator';
import AppStackNavigator from './AppStackNavigator';

const Stack = createNativeStackNavigator<AppParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AppTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AppTabs" component={AppTabNavigator} />
      <Stack.Screen name="AppStacks" component={AppStackNavigator} />
    </Stack.Navigator>
  );
}
