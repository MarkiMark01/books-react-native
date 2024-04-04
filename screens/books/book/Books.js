import React, { useEffect } from "react";
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
} from "react-native";

import { setUniqueBook } from "../../../redux/books/booksSlice";

const Books = ({ navigation }) => {
  const books = useSelector((state) => state.books.books);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  const handleUniqueBook = (book) => {
    dispatch(setUniqueBook(book));
    navigation.navigate("UniqueBook");
  };

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(getBooks());
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={"#001838"} />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          data={books}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.bookContainer}
              activeOpacity={0.8}
              onPress={() => handleUniqueBook(item)}
            >
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
              <Text>{item.title}</Text>
              <Text>{item.author}</Text>
              <Text>{item.price}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <StatusBar theme="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bookContainer: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Books;
