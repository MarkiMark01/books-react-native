import { StyleSheet, Text } from "react-native";

const About = () => {
  return <Text style={styles.container}>About</Text>;
};
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
});
