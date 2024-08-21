import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
<<<<<<< HEAD
import {
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

=======
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useAuth from "./shared/hooks/useAuth";
import { Login } from "./screens/auth/Login";
import { Register } from "./screens/auth/Register";
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
import Books from "./screens/books/book/Books";
import Cart from "./screens/books/cart/Cart";
import About from "./screens/books/About";
import UniqueBook from "./screens/books/bookId/UniqueBook";
<<<<<<< HEAD
import Auth from "./screens/auth/Auth";

const authRoute = createStackNavigator();
=======

const authRoute = createStackNavigator();
const AuthStack = createStackNavigator();
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
const MainTab = createBottomTabNavigator();

const tabBarOptions = {
  tabBarShowLabel: false,
  tabBarStyle: { display: "flex", backgroundColor: "#2fc5f9" },
<<<<<<< HEAD
=======
  // tabBarActiveTintColor: "#F3D88E",
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
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

<<<<<<< HEAD
const toggleRoute = (session) => {
  if (!session) {
    return (
      <authRoute.Navigator>
        <authRoute.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
      </authRoute.Navigator>
=======
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
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
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

<<<<<<< HEAD
const Navigation = ({ session }) => {
  return <NavigationContainer>{toggleRoute(session)}</NavigationContainer>;
};

export default Navigation;
=======
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
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
