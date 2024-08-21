import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { store } from "./redux/store";
import i18n from "./i18next/i18n";
import "intl";
import "intl-pluralrules";
import { supabase } from "./lib/supabase";
import Navigation from "./Navigation";

export default function Main() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "salsa-regular": require("./fonts/Salsa.ttf"),
        "mt-m": require("./fonts/MontserratAlternates-Medium.ttf"),
        "mt-r": require("./fonts/MontserratAlternates-Regular.ttf"),
        "mt-b": require("./fonts/MontserratAlternates-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        Alert.alert(
          "The session is invalid or timed out. Please sign in again."
        );
      }
      setSession(session);
    };
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <View style={styles.container}>
          <Navigation session={session} />
        </View>
      </I18nextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
