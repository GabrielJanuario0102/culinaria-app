import ListIngredientes from "@/src/components/ListIngredientes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "expo-router";

const Ingredientes = () => {
  const [listaIngredientes, setListaIngredientes] = useState([]);

  const loadIngredientes = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("ingredientes");
      const ingredientes = data ? JSON.parse(data) : [];

      setListaIngredientes(ingredientes);
    } catch (error) {
      console.log("Erro ao carregar ingredientes:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadIngredientes();
    }, [loadIngredientes])
  );

  return (
    <View style={styles.container}>
      <ListIngredientes
        listaIngredientes={listaIngredientes}
        setListaIngredientes={setListaIngredientes}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
});

export default Ingredientes;