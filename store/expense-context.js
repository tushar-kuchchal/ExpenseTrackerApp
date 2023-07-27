import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpense: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function ExpensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted=action.payload.reverse()
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id != action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [ExpensesState, dispatch] = useReducer(ExpensesReducer, []);
  function addExpense(expenses) {
    dispatch({ type: "ADD", payload: expenses });
  }
  function setExpense(expenses){
    dispatch({type:'SET',payload:expenses})
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenses) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenses } });
  }
  value = {
    expenses: ExpensesState,
    addExpense: addExpense,
    setExpense:setExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}
export default ExpenseContextProvider;
