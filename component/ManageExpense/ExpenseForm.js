import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormatedDate } from "../../utils/date";

function ExpenseForm({ onCancle, editableButton, onSubmit, defaultValue }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormatedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expenses = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = expenses.amount > 0 && !isNaN(expenses.amount);
    const dateIsValid = expenses.date.toString() !== "Invalid Input";
    const descriptionIsValid = expenses.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs({
        amount: { value: "", isValid: amountIsValid },
        date: { value: "", isValid: dateIsValid },
        description: { value: "", isValid: descriptionIsValid},
      });
      return;
    }
    onSubmit(expenses);
  }
  const NotValid=!inputs.amount.isValid||!inputs.date.isValid||!inputs.description.isValid
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Add Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          txtconfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.torow}
        />
        <Input
          label="Date"
          txtconfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.torow}
        />
      </View>
      <Input
        label="Description"
        txtconfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {NotValid &&<Text style={styles.error}>you entered wrong inputs</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancle}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {editableButton}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;
const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  torow: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginVertical: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  error:{
    fontSize:20,
    color:'red',
    marginBottom:5

  }
});
