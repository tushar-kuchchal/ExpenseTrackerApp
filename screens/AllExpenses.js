import { useContext } from "react"

import ExpensesOutput from "../component/ExpensesOutput/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"
function AllExpenses(){
    const expensecntx=useContext(ExpenseContext)

    return <ExpensesOutput expenses={expensecntx.expenses} expensePeriod='total' fallbackText='no register content You can Add from above' />
}
export default AllExpenses