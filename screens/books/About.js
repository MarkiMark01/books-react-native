import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

import usa from "../../assets/usa.png";
import ua from "../../assets/ua.png";

import { logout } from "../../redux/auth/authOperations";
import { getUser } from "../../redux/auth/authSelectors";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next/i18n";

const About = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLogout = () => {
    dispatch(logout());
  };

  const changeLanguage = async (lng) => {
    await AsyncStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  const name = user && user.name ? user.name : "Guest";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerName}>
            <Image
              source={require("../../assets/pngegg.png")}
              style={styles.image}
            />
            <Text style={styles.headerTitle}>{name}</Text>
          </View>
          <View style={styles.languageContainer}>
            <TouchableOpacity
              onPress={() => changeLanguage("en")}
              style={styles.languageButton}
            >
              <Image source={usa} style={styles.flag} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeLanguage("uk")}
              style={styles.languageButton}
            >
              <Image source={ua} style={styles.flag} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.headerBtn}>
            <Text style={styles.headerBtnT}>{t("Log out")}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontFamily: "mt-b",
              marginBottom: 10,
            }}
          >
            {t("Online Bookstore")}
          </Text>
          <Text style={styles.description}>
            {t(
              "At Book Store, we invite you to embark on a journey through the enchanting realms of literature, where every page unfolds a new adventure. Our online bookstore is a haven for book enthusiasts, offering an extensive and diverse collection that caters to every taste and preference."
            )}
          </Text>
          <Text style={styles.description}>
            {t(
              "Explore a World of Books: From timeless classics that have shaped generations to the latest page-turners captivating readers worldwide, our curated selection spans various genres, ensuring there's something for everyone. Immerse yourself in fiction, get inspired by non-fiction, or let the little ones discover magical worlds in our children's section."
            )}
          </Text>
          <Text style={styles.description}>
            {t(
              "Visit Our Imaginary Storefront: While our physical address is purely fictional, the warmth and joy of exploring our virtual bookstore are very real. Wander through the digital aisles, browse book covers, and read engaging summaries - all from the comfort of your home."
            )}
          </Text>
          <Text style={styles.description}>
            {t(
              "Customer Support: Have a question or need assistance? Our friendly and fictional customer support team is just a phone call away."
            )}
          </Text>
          <Text style={styles.description}>
            {t(
              "Dial 555-123-4567 for personalized assistance or drop us an email at info@bookhaven.com."
            )}
          </Text>
          <Text style={styles.description}>
            {t(
              "Online Ordering Made Easy: Experience the convenience of online shopping with our user-friendly platform. Browse, add to your cart, and securely check out - all in a few clicks. We ship to imaginary locations worldwide!"
            )}
          </Text>
          <Text style={styles.description}>
            {t(
              "Whether you're an avid reader, a casual browser, or a gift-giver in search of the perfect literary present, Book Haven is your destination for literary bliss. Discover the joy of reading with us – where every book is an adventure waiting to be unfolded. Happy reading!"
            )}
          </Text>
          <Text style={styles.description}>
            {t('"We are in the city of Lviv, Ukraine."')}
          </Text>
          <View
            style={{
              marginBottom: 20,
              width: 363,
              height: 200,
              marginLeft: "4%",
            }}
          >
            <MapView
              style={{
                width: 363,
                height: 200,
              }}
              initialRegion={{
                latitude: 49.8397,
                longitude: 24.0297,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: 49.8419, longitude: 24.0315 }}
                title={t("Our office")}
              />
            </MapView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1eff9",
    // marginTop: 10,
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#2fc5f9",
  },
  headerName: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 250,
    marginLeft: 10,
  },
  headerTitle: {
    marginLeft: 10,
    fontFamily: "mt-b",
    fontSize: 18,
    color: "#fff",
  },
  headerBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    marginRight: 30,
  },
  headerBtnT: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "mt-m",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3D88E",
    marginLeft: 20,
  },
  description: {
    fontSize: 13,
    fontFamily: "mt-b",
    color: "#001838",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    textAlign: "justify",
  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
  },
  languageButton: {
    marginHorizontal: 3,
  },
  flag: {
    width: 25,
    height: 25,
  },
});

export default About;
