import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigations/RootNavigator';
import { CustomTheme } from './utils/theme';
import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <UserProvider>
        <NavigationContainer theme={CustomTheme}>
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
