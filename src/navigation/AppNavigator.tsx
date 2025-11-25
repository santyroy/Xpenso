import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from '../types/navigation-types';
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

const Tab = createBottomTabNavigator<AppParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
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
