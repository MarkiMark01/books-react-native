import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import { Navigation } from "./Navigation";
import { store } from "./redux/store";

export default function App() {
  const [loaded] = useFonts({
    "salsa-regular": require("./fonts/Salsa.ttf"),
    "mt-m": require("./fonts/MontserratAlternates-Medium.ttf"),
    "mt-r": require("./fonts/MontserratAlternates-Regular.ttf"),
    "mt-b": require("./fonts/MontserratAlternates-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        {/* <StatusBar style="auto" /> */}
        <Navigation />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
