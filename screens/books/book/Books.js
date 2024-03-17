import { StyleSheet, Text } from "react-native";

const Books = () => {
  return <Text style={styles.container}>Books</Text>;
};
export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
});
