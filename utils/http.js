import axios from "axios";

const BaseUrl =
  // "https://react-native-course-d919f-default-rtdb.asia-southeast1.firebasedatabase.app/";
  "https://dummy-app-d4682-default-rtdb.firebaseio.com/"
export async function storeExpenses(expenseData) {
   const res=await axios.post(BaseUrl + "expenses.json", expenseData);
   const id=res.data.name
   return id
}
export async function fetchExpenses() {
  const expenses = [];
  const res = await axios.get(BaseUrl + "expenses.json");

  for (const key in res.data) {
    let expenseobj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseobj);
  }
  return expenses;
}
export async function updateExpense(id,expense){
   await axios.put(BaseUrl+`expenses/${id}.json`,expense)
}
export  async function deleteExpense(id){
   await axios.delete(BaseUrl+`expenses/${id}.json`)
}

