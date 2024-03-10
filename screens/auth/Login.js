import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Login = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.titleText}>MY APP!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "blue",
  },
  titleText: {
    fontSize: 28,
    color: "#fff",
  },
});
