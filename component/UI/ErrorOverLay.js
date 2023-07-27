import { View, StyleSheet, Text } from "react-native";
import { GlobalStyle } from "../../constants/styles";

function ErrorOverLay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>something went Wrong</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
export default ErrorOverLay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: GlobalStyle.colors.primary500,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
