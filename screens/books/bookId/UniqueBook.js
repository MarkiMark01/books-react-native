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
        <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default UniqueBook;
