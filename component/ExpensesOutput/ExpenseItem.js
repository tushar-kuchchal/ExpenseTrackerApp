import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyle } from "../../constants/styles";
import { getFormatedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";
function Expenseitem({ id,description, amount, date }) {
  const navigation = useNavigation();
  function onPressHandler() {
    navigation.navigate("manageScreen",{
      expenseId:id
    });
  }
  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rs. {amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default Expenseitem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyle.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyle.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyle.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 90,
  },
  amount: {
    color: GlobalStyle.colors.primary500,
    fontWeight: "bold",
  },
});
