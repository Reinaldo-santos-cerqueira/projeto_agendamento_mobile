import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '@screen';

export type AuthStackParams = {
  LoginScreen: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParams>();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="LoginScreen" component={Login} />
    </Stack.Navigator>
  );
}
