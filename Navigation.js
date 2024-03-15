import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "./screens/auth/Login";
import { Register } from "./screens/auth/Register";

const AuthStack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
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
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
