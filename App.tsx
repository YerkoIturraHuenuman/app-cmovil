import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigators/stack.navigator";
import { VariablesContextProvider } from "./src/contexts/VariablesContext";


export default function App() {
  return (
    <VariablesContextProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </VariablesContextProvider>
    
  );
}
