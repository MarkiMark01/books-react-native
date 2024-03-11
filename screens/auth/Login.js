import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

export const Login = () => {
  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <View>
          <Text style={styles.titleText}>Email</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.titleText}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnTitle}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#001838",
  },
  titleText: {
    fontSize: 20,
    color: "#F3D88E",
  },
  input: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#F3D88E",
    color: "#F3D88E",
    marginTop: 3,
    borderRadius: 20,
    height: 40,
    fontSize: 18,
    textDecorationLine: "none",
  },
  form: {
    marginHorizontal: 20,
  },
  btn: {
    height: 40,
    borderRadius: 20,
    color: "#001838",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    ...Platform.select({
      ios: {
        backgroundColor: "#F3D88E",
      },
      android: {
        backgroundColor: "#F3D88E",
      },
    }),
  },
  btnTitle: {
    fontSize: 22,
  },
});
