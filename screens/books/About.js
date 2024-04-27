import React from "react";
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

import { logout } from "../../redux/auth/authOperations";
import { getUser } from "../../redux/auth/authSelectors";

const About = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
          <TouchableOpacity onPress={handleLogout} style={styles.headerBtn}>
            <Text style={styles.headerBtnT}>Logout</Text>
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
            Online Bookstore
          </Text>
          <Text style={styles.description}>
            At Book Store, we invite you to embark on a journey through the
            enchanting realms of literature, where every page unfolds a new
            adventure. Our online bookstore is a haven for book enthusiasts,
            offering an extensive and diverse collection that caters to every
            taste and preference.
          </Text>
          <Text style={styles.description}>
            📚 Explore a World of Books: From timeless classics that have shaped
            generations to the latest page-turners captivating readers
            worldwide, our curated selection spans various genres, ensuring
            there's something for everyone. Immerse yourself in fiction, get
            inspired by non-fiction, or let the little ones discover magical
            worlds in our children's section.
          </Text>
          <Text style={styles.description}>
            🏡 Visit Our Imaginary Storefront: While our physical address is
            purely fictional, the warmth and joy of exploring our virtual
            bookstore are very real. Wander through the digital aisles, browse
            book covers, and read engaging summaries - all from the comfort of
            your home.
          </Text>
          <Text style={styles.description}>
            📞 Customer Support: Have a question or need assistance? Our
            friendly and fictional customer support team is just a phone call
            away.
          </Text>
          <Text style={styles.description}>
            Dial 555-123-4567 for personalized assistance or drop us an email at
            info@bookhaven.com.
          </Text>
          <Text style={styles.description}>
            🌐 Online Ordering Made Easy: Experience the convenience of online
            shopping with our user-friendly platform. Browse, add to your cart,
            and securely check out - all in a few clicks. We ship to imaginary
            locations worldwide!
          </Text>
          <Text style={styles.description}>
            Whether you're an avid reader, a casual browser, or a gift-giver in
            search of the perfect literary present, Book Haven is your
            destination for literary bliss. Discover the joy of reading with us
            – where every book is an adventure waiting to be unfolded. Happy
            reading! 📖✨
          </Text>
          <Text style={styles.description}>
            "We are in the city of Lviv, Ukraine."
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
                title="Our office"
              />
            </MapView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
