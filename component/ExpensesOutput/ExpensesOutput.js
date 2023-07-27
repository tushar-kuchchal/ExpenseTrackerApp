import { Text,View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyle } from "../../constants/styles";
function ExpensesOutput({ expenses, expensePeriod,fallbackText }) {
  let content=<Text style={styles.info}>{fallbackText}</Text>
  if (expenses.length!=0){
    content=<ExpensesList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensePeriod} />
      {content}
    </View>
  );
}
export default ExpensesOutput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.primary700,
    padding: 24,
  },
  info:{
    color:'white',
    textAlign:'center',
    marginTop:32,
    fontSize:16
  }
});
