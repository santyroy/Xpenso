import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigations/RootNavigator';
import { CustomTheme } from './utils/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <NavigationContainer theme={CustomTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
