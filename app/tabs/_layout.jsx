import { Icon, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          animation: "fade",
          tabBarIcon: () => null,
          tabBarLabelStyle: style.labelStyle,
        }}
      />

      <Tabs.Screen
        name="Receitas"
        options={{
          title: "Receitas",
          animation: "fade",
          tabBarIcon: () => null,
          tabBarLabelStyle: style.labelStyle,
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    position: "relative",
    top: -15
  }
});
