import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamList } from '../types/navigation-types';
import BootSplash from 'react-native-bootsplash';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useUser } from '../hooks/useUser';

const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {
  const { hasOnboarded, isLoading } = useUser();

  useEffect(() => {
    const hideSplash = async () => {
      if (!isLoading) {
        await BootSplash.hide({ fade: true });
      }
    };

    hideSplash();
  }, [isLoading]);

  if (isLoading) {
    // Keep returning null while loading so the
    // Native Splash remains visible and undisturbed.
    return null;
  }

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
