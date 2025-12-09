import { NavigatorScreenParams } from '@react-navigation/native';

export type RootParamList = {
  Auth: NavigatorScreenParams<AuthParamList>;
  App: NavigatorScreenParams<AppParamList>;
};

export type AuthParamList = {
  Signup: undefined;
};

export type AppParamList = {
  AppTabs: NavigatorScreenParams<AppTabParamList>;
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
