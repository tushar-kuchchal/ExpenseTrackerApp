import { FlatList,  } from "react-native";
import Expenseitem from "./ExpenseItem";
function ExpensesList({ expenses }) {
  function renderItemHelper(itemData) {
    return <Expenseitem {...itemData.item}/>;
  }
  return (
    <FlatList
      data={expenses}
      renderItem={renderItemHelper}
      keyExtractor={(item) => item.id}
    />
  );
}
export default ExpensesList;

