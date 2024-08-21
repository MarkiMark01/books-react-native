import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../../redux/books/booksOperations";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";

import { setUniqueBook } from "../../../redux/books/booksSlice";

const BookItem = React.memo(({ item, handleUniqueBook }) => (
  <TouchableOpacity
    key={item.id}
    style={styles.bookContainer}
    activeOpacity={0.8}
    onPress={() => handleUniqueBook(item)}
  >
    {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
    <View style={{ width: "100%" }}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <View style={styles.bookBox}>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPrice}>$ {item.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
));

const Books = ({ navigation }) => {
  const books = useSelector((state) => state.books.books);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);
  const [filter, setFilter] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleUniqueBook = (book) => {
    dispatch(setUniqueBook(book));
    navigation.navigate("UniqueBook");
    setFilter("");
  };

  const filterBooks = () => {
    return books.filter(
      (item) =>
        item.title && item.title.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onRefresh = () => {
    dispatch(getBooks());
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder={t("Search by book title")}
            value={filter}
            onChangeText={setFilter}
            onFocus={() => setIsShowKeyboard(true)}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={"#001838"} />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            data={filterBooks()}
            renderItem={({ item }) => (
              <BookItem item={item} handleUniqueBook={handleUniqueBook} />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
        <StatusBar barStyle="light-content" backgroundColor="#001838" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1eff9",
  },
  bookContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    width: 280,
    height: 470,
    borderWidth: 1,
    borderColor: "#F3D88E",
    borderRadius: 20,
    // shadowColor: "#2fc5f9",
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5, // Для Android
  },
  image: {
    width: 265,
    height: 365,
    borderWidth: 2,
    borderColor: "#e1eff9",
    borderRadius: 20,
    marginTop: 5,
  },
  inputBox: {
    width: "90%",
  },
  input: {
    height: 40,
    borderColor: "#001838",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    color: "#001838",
    textAlign: "center",
    fontSize: 18,
  },
  bookTitle: {
    height: 50,
    fontSize: 18,
    fontFamily: "mt-b",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    color: "#001838",
  },
  bookBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookAuthor: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: "mt-b",
    color: "#001838",
  },
  bookPrice: {
    marginRight: 15,
    fontSize: 18,
    fontFamily: "mt-b",
    color: "#001838",
  },
});

export default Books;
