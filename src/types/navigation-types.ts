import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthParamList = {
  Signup: undefined;
};

export type AppParamList = {
  Home: undefined;
  Analytics: undefined;
  AddTransaction: undefined;
  Budget: undefined;
  Profile: undefined;
};

export type AddTransactionScreenNavigationProp = BottomTabNavigationProp<
  AppParamList,
  'AddTransaction'
>;
