import { StyleSheet, Text } from "react-native";

const Cart = () => {
  return <Text style={styles.container}>Cart empty</Text>;
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
});
