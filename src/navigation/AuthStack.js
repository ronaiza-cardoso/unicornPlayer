import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register from '../pages/Register';

const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
