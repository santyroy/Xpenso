import { NavigatorScreenParams } from '@react-navigation/native';

export type RootParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthParamList = {
  Signup: undefined;
};

export type AppParamList = {
  AppTabs: undefined;
  AppStacks: NavigatorScreenParams<AppStackParamList>;
};

export type AppTabParamList = {
  Home: undefined;
  Analytics: undefined;
  Budget: undefined;
  Profile: undefined;
  AddTransactionButton: undefined;
};

export type AppStackParamList = {
  AddTransaction: undefined;
  AddBudget: undefined;
  Transactions: undefined;
};
