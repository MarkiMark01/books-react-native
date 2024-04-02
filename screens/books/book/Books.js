// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getBooks } from "../../../redux/books/booksOperations";
// import { View, Text, StyleSheet, Image, FlatList } from "react-native";

// const Books = () => {
//   const books = useSelector((state) => state.books.books);
//   const isLoading = useSelector((state) => state.books.isLoading);
//   const error = useSelector((state) => state.books.error);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getBooks());
//   }, [dispatch]);

//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <Text>Loading...</Text>
//       ) : error ? (
//         <Text>Error: {error}</Text>
//       ) : (
//         <View>
//           {books.map((book) => (
//             <View key={book.id} style={styles.bookContainer}>
//               {book.image && (
//                 <Image source={{ uri: book.image }} style={styles.image} />
//               )}
//               <Text>{book.title}</Text>
//               <Text>{book.author}</Text>
//               <Text>{book.price}</Text>
//             </View>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getBooks } from "../../../redux/books/booksOperations";
// import { View, Text, StyleSheet, Image, FlatList } from "react-native";

// const Books = () => {
//   const books = useSelector((state) => state.books.books);
//   const isLoading = useSelector((state) => state.books.isLoading);
//   const error = useSelector((state) => state.books.error);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getBooks());
//   }, [dispatch]);

//   const renderItem = ({ item }) => (
//     <View key={item.id} style={styles.bookContainer}>
//       {item.image && (
//         <Image source={{ uri: item.image }} style={styles.image} />
//       )}
//       <Text>{item.title}</Text>
//       <Text>{item.author}</Text>
//       <Text>{item.price}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <Text>Loading...</Text>
//       ) : error ? (
//         <Text>Error: {error}</Text>
//       ) : (
//         <FlatList
//           data={books}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bookContainer: {
//     marginBottom: 20,
//   },
//   image: {
//     width: 100,
//     height: 150,
//     marginBottom: 10,
//   },
// });

// export default Books;

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

const Books = () => {
  const books = useSelector((state) => state.books.books);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(getBooks());
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
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
