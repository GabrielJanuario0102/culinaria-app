import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/views/Home";
import Listagem from "./src/views/Listagem";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView>
      
    </SafeAreaView>
  );
}
