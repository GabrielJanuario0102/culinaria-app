import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const _layout = () => {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default _layout;
