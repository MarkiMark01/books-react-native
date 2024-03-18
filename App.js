import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

import { Navigation } from "./Navigation";

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
      {/* <StatusBar style="auto" barStyle="light-content" /> */}
      <Navigation />
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
