import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthParamList } from '../types/navigation-types';
import SignupScreen from '../screens/auth/SignupScreen';

const Stack = createNativeStackNavigator<AuthParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
