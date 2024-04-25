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

const Cart = () => {
  const cart = useSelector((state) => state.books.cart);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);
  const [modalWindow, toggleModalOpen, toggleModalClose] = useModal();

  const dispatch = useDispatch();

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
          <Text style={styles.titleName}>Title</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.price}>Quantity</Text>
          <Text style={styles.price}>Total</Text>
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



};