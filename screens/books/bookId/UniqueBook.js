import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";

const UniqueBook = () => {
  const uniqueBook = useSelector((state) => state.books.uniqueBook);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);

  if (!uniqueBook) {
    return <Text>No unique book selected</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={"#001838"} size="large" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text>{item.title}</Text>
          <Text>{item.author}</Text>
          <TouchableOpacity onPress={() => console.log("Add to cart")}>
            <Text>Add to Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      data={[uniqueBook]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => { }} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#e1eff9",
  },

  image: {
    width: 265,
    height: 365,
    borderColor: "#e1eff9",
    borderWidth: 1,
    borderColor: "#F3D88E",
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  bookTitle: {
    height: 50,
    fontSize: 20,
    fontFamily: "mt-b",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    color: "#001838",
    textAlign: "center",
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
  box: {
    justifyContent: "center",
    alignItems: "center",
    width: 365,
    borderWidth: 2,
    borderColor: "#F3D88E",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  priceBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    height: 30,
  },
  price: {
    fontSize: 18,
    fontFamily: "mt-m",
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  countBlock: {
    flexDirection: "row",
    width: "100%",
    height: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantity: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "mt-m",
  },
  count: {
    flexDirection: "row",
    marginRight: 15,
  },
  totalBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  total1: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "mt-m",
  },

});

export default UniqueBook;
