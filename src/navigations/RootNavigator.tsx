import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamList } from '../types/navigation-types';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useUser } from '../hooks/useUser';

const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {
  const { hasOnboarded } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {hasOnboarded ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
