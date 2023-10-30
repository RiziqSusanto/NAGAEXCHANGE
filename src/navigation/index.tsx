import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import {StackNavigationProp} from '@react-navigation/stack';
import DetailScreen from '../screens/Detail';
const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Login: undefined;
  Home: {isAuthenticated: boolean};
  Detail: {
    isAuthenticated: boolean;
    symbol: string;
    name: string;
    pair: string;
    icon: string;
    taker_fee: number;
    maker_fee: number;
    min_symbol_transaction: number;
    min_pair_transaction: number;
    min_sell_huobi: number;
    price_precision: number;
    quantity_precision: number;
    vol: number;
    low: number;
    high: number;
    price: number;
    change: string;
    volume_coin: string;
  };
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export type {
  RootStackParamList,
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
  DetailScreenNavigationProp,
  DetailScreenRouteProp,
  LoginScreenNavigationProp,
};

const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          name={'Login'}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Detail'}
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
