import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useAuth from "./shared/hooks/useAuth";
import { Login } from "./screens/auth/Login";
import { Register } from "./screens/auth/Register";
import Books from "./screens/books/book/Books";
import Cart from "./screens/books/cart/Cart";
import About from "./screens/books/About";
import UniqueBook from "./screens/books/bookId/UniqueBook";

const authRoute = createStackNavigator();
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const toggleRoute = (isLogin) => {
  if (!isLogin) {
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
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex" }, null],
      }}
    >
      <MainTab.Screen
        name="Books"
        component={Books}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name="my-library-books" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="UniqueBook"
        component={UniqueBook}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Entypo name="info" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

export const Navigation = () => {
  const isLogin = useAuth();

  return (
    <NavigationContainer>
      <authRoute.Navigator>
        <authRoute.Screen name="AuthScreens" options={{ headerShown: false }}>
          {() => toggleRoute(isLogin)}
        </authRoute.Screen>
      </authRoute.Navigator>
    </NavigationContainer>
  );
};
