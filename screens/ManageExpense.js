import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ButtonIcon from "../component/UI/ButtonIcon";
import { GlobalStyle } from "../constants/styles";
import { deleteExpense, storeExpenses, updateExpense } from "../utils/http";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../component/ManageExpense/ExpenseForm";
import LoadingOverLay from "../component/UI/LoadingOverLay";
import ErrorOverLay from "../component/UI/ErrorOverLay";
function ManageExpense({ navigation, route }) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();
  const expensecntx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEdited = !!editedExpenseId;
  const selectedExpense = expensecntx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdited]);
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setLoader(true);
    try {
      if (isEdited) {
        expensecntx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpenses(expenseData);
        expensecntx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("could not save the data");
      setLoader(false);
    }
  }
  async function deleteHandler() {
    setLoader(true);
    try{
    await deleteExpense(editedExpenseId);
    expensecntx.deleteExpense(editedExpenseId);
    navigation.goBack();
    }catch(error){
      setError('could not delete the item')
      setLoader(false);
    }
    
    
  }
  if (error && !loader) {
    return <ErrorOverLay message={error}  />;
  }
  if (loader) {
    return <LoadingOverLay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancle={cancelHandler}
        editableButton={isEdited ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />

      {isEdited && (
        <View style={styles.deleteContainer}>
          <ButtonIcon
            icon="trash"
            color={GlobalStyle.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyle.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyle.colors.primary200,
    alignItems: "center",
  },
});
