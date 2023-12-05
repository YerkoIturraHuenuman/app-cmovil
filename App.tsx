import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigators/stack.navigator";
import DrawerNavigator from "./src/navigators/drawer.navigator";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DatabaseScreen } from "./src/screens/DatabaseScreen";
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
//<DatabaseScreen />
