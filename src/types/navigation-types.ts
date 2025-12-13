import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SerializableTransaction } from './transactions-types';

export type RootParamList = {
  Auth: NavigatorScreenParams<AuthParamList>;
  App: NavigatorScreenParams<AppParamList>;
};

export type AuthParamList = {
  Signup: undefined;
};

export type AppParamList = {
  AppTabs: NavigatorScreenParams<AppTabParamList>;
  AddTransaction: { transaction: SerializableTransaction } | undefined;
  AddBudget: undefined;
  Transactions: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Analytics: undefined;
  Budget: undefined;
  Profile: undefined;
  AddTransactionButton: undefined;
};

// 1. The primary navigator for the Home Screen
type HomeTabNavigationProp = BottomTabNavigationProp<AppTabParamList, 'Home'>;

// 2. The *stack* navigator that Home is part of (via AppTabs -> App)
// This is usually the stack that wraps the tabs, which for you is AppParamList
type AppNavigationProp = NativeStackNavigationProp<AppParamList>;

// 3. Combine them to get the full navigation capabilities of a screen in the tab navigator
export type HomeCompositeNavigationProp = CompositeNavigationProp<
  HomeTabNavigationProp,
  AppNavigationProp
>;

export type TransactionsScreenNavigationProp = NativeStackNavigationProp<
  AppParamList,
  'Transactions'
>;

export type AddTransactionScreenNavigationProp = NativeStackNavigationProp<
  AppParamList,
  'AddTransaction'
>;
