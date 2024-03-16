import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Login } from "./screens/auth/Login";
import { Register } from "./screens/auth/Register";
import Books from "./screens/books/Books";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <AuthStack.Navigator>
        <AuthStack.Screen
          name={"Login"}
          component={Login}
          // options={{ title: "Login" }}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name={"Register"}
          component={Register}
          // options={{ title: "Register" }}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator> */}
      <MainTab.Navigator>
        <MainTab.Screen name="Books" component={Books} />
      </MainTab.Navigator>
    </NavigationContainer>
  );
};
