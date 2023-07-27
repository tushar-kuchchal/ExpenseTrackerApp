import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expense-context";
import ExpensesOutput from "../component/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverLay from "../component/UI/LoadingOverLay";
import ErrorOverLay from "../component/UI/ErrorOverLay";
function RecentExpenses() {
  const [isFetch, setIsFetch] = useState(true);
  const [isError, setIsError] = useState();
  const expensesCntx = useContext(ExpenseContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetch(true);
      try {
        const expenses = await fetchExpenses();
        expensesCntx.setExpense(expenses);
      } catch (error) {
        setIsError('could not fetch expenses!');
      }
      setIsFetch(false);
    }
    getExpenses();
  }, []);
  if (isError && !isFetch) {
    return <ErrorOverLay message={isError}  />;
  }
  if (isFetch) {
    return <LoadingOverLay />;
  }
  const recentExpneses = expensesCntx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysago = getDateMinusDays(today, 7);
    return expense.date >= date7daysago;
  });

  return (
    <ExpensesOutput
      expenses={recentExpneses}
      expensePeriod="Last 7 days"
      fallbackText="No register content in previous 7 days"
    />
  );
}
export default RecentExpenses;
