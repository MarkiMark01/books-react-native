import React, { useState, useEffect } from "react";
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
  Dimensions,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";

import { signup } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
  name: "",
};

export const Register = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };

    Dimensions.addEventListener("change", onChange);

    return () => {
      const removeListener =
        Dimensions.removeEventListener || Dimensions.removeDimensionsListener;
      if (removeListener) {
        removeListener("change", onChange);
      }
    };
  }, []);

  const handleEmail = (value) => {
    setState((prevState) => ({ ...prevState, email: value }));
  };
  const handlePassword = (value) => {
    setState((prevState) => ({ ...prevState, password: value }));
  };
  const handleName = (value) => {
    setState((prevState) => ({ ...prevState, name: value }));
  };

  const handleSubmit = () => {
    dispatch(signup(state));
    console.log("Форма була успішно надіслана:", state);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.main}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "android" ? "" : "padding"}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 20 : 30,
              width: dimensions,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Sign up</Text>
            </View>
            <View>
              <Text style={styles.titleText}>Name</Text>
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.name}
                onChangeText={handleName}
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.titleText}>Email</Text>
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={handleEmail}
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.titleText}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={handlePassword}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.btnTitle}>Log in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <StatusBar theme="auto" />
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
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    color: "#F3D88E",
    fontFamily: "mt-m",
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
    // marginHorizontal: 20,
    marginBottom: 40,
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
    fontFamily: "mt-b",
  },
  header: {
    alignItems: "center",
    marginBottom: 120,
  },
  headerText: {
    fontSize: 36,
    color: "#F3D88E",
    fontFamily: "salsa-regular",
  },
});
