import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export const Login = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.main}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "android" ? "" : "padding"}
        >
          <View
            // style={{ ...styles.form, marginBottom: isShowKeyboard ? 200 : 50 }}
            style={styles.form}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Log In</Text>
            </View>
            <View>
              <Text style={styles.titleText}>Email</Text>
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.titleText}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>Log In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-end",
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
    marginBottom: 20,
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
  header: {
    alignItems: "center",
    marginBottom: 150,
  },
  headerText: {
    fontSize: 30,
    color: "#F3D88E",
  },
});
