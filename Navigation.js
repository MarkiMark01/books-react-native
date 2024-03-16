import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Login } from "./screens/auth/Login";
import { Register } from "./screens/auth/Register";
import Books from "./screens/books/Books";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const toggleRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name={"Login"}
          component={Login}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name={"Register"}
          component={Register}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Books" component={Books} />
    </MainTab.Navigator>
  );
};

export const Navigation = () => {
  const isUserAuth = false;
  const routing = toggleRoute(isUserAuth);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
