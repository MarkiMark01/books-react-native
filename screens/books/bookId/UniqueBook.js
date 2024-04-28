import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addNewCart } from "../../../redux/books/booksOperations";
import { useModal } from "../../../shared/hooks/useModal";

const UniqueBook = ({ navigation }) => {
  const uniqueBook = useSelector((state) => state.books.uniqueBook);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);
  const cart = useSelector((state) => state.books.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalWindow, toggleModalOpen, toggleModalClose] = useModal();

  useEffect(() => {
    if (uniqueBook) {
      calculateTotalPrice(quantity, uniqueBook.price);
    }
  }, [uniqueBook, quantity]);

  const handleQuantity = (count) => {
    let newQuantity;
    if (count === "") {
      newQuantity = "";
    } else {
      newQuantity = isNaN(count) ? 1 : Math.max(1, Math.floor(Number(count)));
    }

    setQuantity(newQuantity);
    calculateTotalPrice(newQuantity, uniqueBook.price);
  };

  const calculateTotalPrice = (quantity, price) => {
    const total = quantity * price;
    setTotalPrice(total.toFixed(2));
  };

  const handleAddToCart = () => {
    const isBookInCart = cart.some((item) => item.id === uniqueBook.id);
    if (isBookInCart) {
      toggleModalOpen();
    } else {
      dispatch(
        addNewCart({
          id: uniqueBook.id,
          title: uniqueBook.title,
          price: uniqueBook.price,
          quantity: quantity,
          totalSum: totalPrice,
        })
      );
      setQuantity(1);
      navigation.navigate("Cart");
    }
  };

  const renderItem = ({ item }) => (
    <>
      {isLoading ? (
        <ActivityIndicator color={"#001838"} size="large" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <View style={styles.container}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.box}>
            <View style={styles.priceBlock}>
              <Text style={styles.price}>Price:</Text>
              <Text style={styles.price}> ${item.price}</Text>
            </View>

            <View>
              <View style={styles.countBlock}>
                <Text style={styles.quantity}>Quantity:</Text>

                <View style={styles.count}>
                  <TouchableOpacity
                    onPress={() => handleQuantity(quantity - 1)}
                    style={{ height: 30 }}
                    activeOpacity={0.8}
                  >
                    <Feather
                      name="minus-circle"
                      size={22}
                      color="red"
                      style={{ marginTop: 5, marginRight: 6 }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: "mt-m",
                      marginLeft: 5,
                      marginRight: 12,
                    }}
                  >
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleQuantity(quantity + 1)}
                    activeOpacity={0.8}
                  >
                    <AntDesign
                      name="pluscircleo"
                      size={20}
                      color="green"
                      style={{ marginTop: 7 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.totalBlock}>
                <Text style={styles.total1}>Total:</Text>
                <Text style={styles.total2}>${totalPrice}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleAddToCart} style={styles.addToCart}>
            <Text style={{ fontSize: 17, fontFamily: "mt-b" }}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  return (
    <>
      {uniqueBook ? (
        <FlatList
          data={[uniqueBook]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
          }
          extraData={[quantity, totalPrice]}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={{ fontSize: 20, fontFamily: "mt-b" }}>
            The book hasn't been added yet...
          </Text>
        </View>
      )}
      <Modal
        visible={modalWindow}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModalClose}
      >
        <TouchableWithoutFeedback onPress={toggleModalClose}>
          <View style={styles.modal}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>
                This book is already in the cart
              </Text>
              <TouchableOpacity
                onPress={toggleModalClose}
                style={styles.modalBtn}
              >
                <Text style={styles.modalBtnT}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
