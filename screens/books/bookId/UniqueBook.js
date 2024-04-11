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
  total2: {
    marginRight: 15,
    fontSize: 22,
    fontFamily: "mt-b",
    color: "#011ea0ff",
  },
  addToCart: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3D88E",
    borderWidth: 1,
    borderColor: "#001838",
    borderRadius: 20,
    width: 365,
    height: 30,
    marginBottom: 10,
  },
  emptyCartContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1eff9",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    height: 150,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1eff9",
  },
  modalText: {
    marginBottom: 50,
    fontSize: 18,
    fontFamily: "mt-b",
    color: "#001838",
    textAlign: "center",
  },
  modalBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#001838",
    backgroundColor: "#F3D88E",
    marginLeft: "75%",
  },
  modalBtnT: {
    fontSize: 18,
    fontFamily: "mt-b",
    color: "#001838",
  },
});

export default UniqueBook;
