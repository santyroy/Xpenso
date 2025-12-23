import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppParamList, AppTabParamList } from '../types/navigation-types';
import HomeScreen from '../screens/app/HomeScreen';
import AnalyticsScreen from '../screens/app/AnalyticsScreen';
import BudgetScreen from '../screens/app/BudgetScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import {
  AnalyticsIcon,
  BudgetIcon,
  HomeIcon,
  ProfileIcon,
} from '../utils/tab-icons';
import NewTransactionButton from '../components/NewTransactionButton';
import EmptyScreen from '../screens/EmptyScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopStartRadius: 15,
          borderEndStartRadius: 15,
        },
        animation: 'shift',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: AnalyticsIcon,
        }}
      />
      {/* Floating button slot */}
      <Tab.Screen
        name="AddTransactionButton"
        component={EmptyScreen}
        options={{ tabBarButton: NewTransactionButton }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            const parentStack =
              navigation.getParent<NativeStackNavigationProp<AppParamList>>();
            if (parentStack) {
              parentStack.navigate('AddTransaction');
            }
          },
        })}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          tabBarIcon: BudgetIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
