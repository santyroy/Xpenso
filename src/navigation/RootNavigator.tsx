import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamList } from '../types/navigation-types';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {
  // TODO: pending auth logic
  const isAuthenticated = false;
  const initialRoute: keyof RootParamList = isAuthenticated ? 'App' : 'Auth';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
}
