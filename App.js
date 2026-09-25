import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import _layout from "./app/_layout";
import FormReceitaView from "./app/FormReceitaView.jsx"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={_layout}
        />

        <Stack.Screen
          name="FormReceitaView"
          component={FormReceitaView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
