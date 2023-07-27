import { View, Text,StyleSheet } from "react-native";
import { GlobalStyle } from "../../constants/styles";
function ExpensesSummary({expenses,periodName}) {
  const expenseSum=expenses.reduce((sum,expense)=>{return sum+expense.amount},0)
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>Rs.{expenseSum.toFixed(2)}</Text>
    </View>
  );
}
export default ExpensesSummary;

const styles=StyleSheet.create({
  container:{
    padding:10,
    backgroundColor:GlobalStyle.colors.primary50,
    borderRadius:6,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  period:{
    fontSize:15,
    color:GlobalStyle.colors.primary400
  },
  sum:{
    fontSize:16,
    fontWeight:'bold',
    color:GlobalStyle.colors.primary500
  }
})
