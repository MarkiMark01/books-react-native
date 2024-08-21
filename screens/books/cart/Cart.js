import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteCart,
  fetchCart,
  clearAllCart,
} from "../../../redux/books/booksOperations";
import { useModal } from "../../../shared/hooks/useModal";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const cart = useSelector((state) => state.books.cart);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);
  const [modalWindow, toggleModalOpen, toggleModalClose] = useModal();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemoveFromCart = (item) => {
    dispatch(deleteCart(item.id));
  };

  const handleRClearCart = () => {
    dispatch(clearAllCart());
    toggleModalOpen();
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalAllSum = cart
    .reduce((sum, item) => sum + parseFloat(item.totalSum), 0)
    .toFixed(2);

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.cartBlock}>
      <View style={styles.titleBlock}>
        <View>
          <Text style={styles.titleName}>{t("Title")}</Text>
        </View>
        <View style={{ flexDirection: "row", marginRight: 5 }}>
          <Text style={styles.price}>{t("Price")}</Text>
          <Text style={styles.price}>{t("Quantity")}</Text>
          <Text style={styles.price}>{t("Total")}</Text>
        </View>
      </View>

      <View style={styles.priceBlock}>
        <View style={styles.title}>
          <Text style={{ fontSize: 16, fontFamily: "mt-b", color: "#001838" }}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveFromCart(item)}
          style={styles.imageBlock}
        >
          <Image
            source={require("../../../assets/bin.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.totalSum}>
          <Text style={styles.totalSumP}>${item.price}</Text>
          <Text style={styles.totalSumQ}>{item.quantity}</Text>
          <Text style={styles.totalSumS}>${item.totalSum}</Text>
        </View>
      </View>
      <View style={styles.foot}></View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <>
          {cart.length > 0 ? (
            <View style={styles.utdBlocks}>
              <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                refreshControl={
                  <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
                }
              />
              <View style={styles.endBlock}>
                {cart.length > 0 && (
                  <View>
                    <Text style={styles.endBlockS}>
                      {t("Total Sum")}: ${totalAllSum}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={handleRClearCart}
                  // disabled={isCartEmpty}
                  style={styles.endBlockBtn}
                >
                  <Text style={styles.endBlockP}>{t("Purchase")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCartContainer}>
              <Feather name="shopping-cart" size={36} color="black" />
              <Text style={{ fontSize: 20, fontFamily: "mt-b" }}>
                {t("Your cart is empty...")}
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
                <AntDesign
                  name="closecircleo"
                  size={30}
                  color="#F3D88E"
                  style={{ marginLeft: "80%", marginBottom: 5 }}
                />
                <View style={styles.modalBox}>
                  <Image
                    source={require("../../../assets/thanks.jpg")}
                    style={styles.modalImage}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#001838",
    backgroundColor: "#fff",
    // backgroundColor: "#e1eff9"
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 350,
    height: 350,
    alignSelf: "center",
  },
  emptyCartContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1eff9",
  },

  cartBlock: {
    width: 365,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    marginTop: 20,
    marginLeft: 14,
    borderRadius: 20,
  },
  titleBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 30,
    backgroundColor: "#2fc5f9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  foot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 30,
    backgroundColor: "#F3D88E",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleName: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 16,
    fontFamily: "mt-b",
  },
  price: {
    color: "#fff",
    marginRight: 10,
    fontSize: 15,
    fontFamily: "mt-b",
    marginRight: 11,
  },
  priceBlock: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 100,
    color: "#001838",
    marginLeft: 5,
    // fontSize: 20,
  },
  imageBlock: {
    justifyContent: "center",
    width: 20,
    height: 50,
  },
  image: {
    width: 25,
    height: 25,
  },
  totalSum: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 185,
    height: 80,
    backgroundColor: "#fff",
    marginRight: 5,
  },
  totalSumP: {
    color: "#001838",
    fontSize: 15,
    marginLeft: 0,
  },
  totalSumQ: {
    textAlign: "left",
    width: 20,
    color: "#001838",
    fontSize: 15,
    marginRight: 0,
  },
  totalSumS: {
    minWidth: 49,
    color: "#001838",
    marginRight: 3,
    // backgroundColor: "grey",
  },
  utdBlocks: {
    width: "100%",
    height: "100%",
  },
  endBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "#001838",
  },
  endBlockP: {
    color: "#F3D88E",
    fontFamily: "mt-b",
  },
  endBlockS: {
    color: "#F3D88E",
    fontSize: 16,
    fontFamily: "mt-b",
    marginLeft: 10,
  },
  endBlockBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 30,
    borderWidth: 1,
    borderColor: "#F3D88E",
    borderRadius: 20,
    marginRight: 10,
  },
});

export default Cart;
