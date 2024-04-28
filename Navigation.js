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

const tabBarOptions = {
  tabBarShowLabel: false,
  tabBarStyle: { display: "flex", backgroundColor: "#2fc5f9" },
  // tabBarActiveTintColor: "#F3D88E",
};

const screenOptions = {
  headerStyle: {
    backgroundColor: "#001838",
    height: 45,
  },
  headerTitleStyle: {
    color: "#F3D88E",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "mt-b",
  },
  headerTitleContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "33%",
  },
};

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
    <MainTab.Navigator screenOptions={tabBarOptions}>
      <MainTab.Screen
        name="Books"
        component={Books}
        options={{
          ...screenOptions,
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialIcons
              name="my-library-books"
              size={size}
              color={focused ? "#fff" : "#001838"}
            />
          ),
          headerTitle: "Books",
        }}
      />
      <MainTab.Screen
        name="UniqueBook"
        component={UniqueBook}
        options={{
          ...screenOptions,
          tabBarIcon: ({ size, color, focused }) => (
            <FontAwesome
              name="book"
              size={size}
              color={focused ? "#fff" : "#001838"}
            />
          ),
          headerTitle: "My book",
        }}
      />
      <MainTab.Screen
        name="Cart"
        component={Cart}
        options={{
          ...screenOptions,
          tabBarIcon: ({ size, color, focused }) => (
            <Feather
              name="shopping-cart"
              size={size}
              color={focused ? "#fff" : "#001838"}
            />
          ),
          headerTitle: "Cart",
        }}
      />
      <MainTab.Screen
        name="About"
        component={About}
        options={{
          ...screenOptions,
          tabBarIcon: ({ size, color, focused }) => (
            <Entypo
              name="info"
              size={size}
              color={focused ? "#fff" : "#001838"}
            />
          ),
          headerTitle: "About",
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
