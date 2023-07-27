import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyle } from "./constants/styles.js";
import { Ionicons } from "@expo/vector-icons";
import ButtonIcon from "./component/UI/ButtonIcon";
import ExpenseContextProvider from "./store/expense-context";

const stack = createNativeStackNavigator();
const bottom = createBottomTabNavigator();

function ExpeseOverview() {
  return (
    <bottom.Navigator
      screenOptions={({navigation})=>({
        headerStyle: { backgroundColor: GlobalStyle.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyle.colors.primary500 },
        tabBarActiveTintColor: GlobalStyle.colors.accent500,
        headerRight: ({ tintColor }) => (
          <ButtonIcon icon="add" size={24} color={tintColor} onPress={()=>{
            navigation.navigate('manageScreen')
          }}/>
        ),
      })}
    >
      <bottom.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <bottom.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </bottom.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
      <NavigationContainer>
        <stack.Navigator screenOptions={{ 
          headerStyle:{backgroundColor:GlobalStyle.colors.primary500},
          headerTintColor:'white'
         }}>
          <stack.Screen
            name="ExpenseOverview"
            component={ExpeseOverview}
            options={{ headerShown: false }}
          />
          <stack.Screen name="manageScreen" component={ManageExpense} options={{ title:'Manage Expense' }}/>
        </stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
