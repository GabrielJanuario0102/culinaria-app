import ListReceitas from "@/src/components/ListReceitas";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useCallback, useState } from "react";

import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "expo-router";

const Receitas = () => {
  const [listaReceitas, setListaReceitas] = useState([]);

  const loadReceitas = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("receitas");
      const receitas = data ? JSON.parse(data) : [];

      setListaReceitas(receitas);
    } catch (error) {
      console.log("Erro ao carregar receitas:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReceitas();
    }, [loadReceitas])
  );

  return (
    <View style={styles.container}>
      <ListReceitas
        listaReceitas={listaReceitas}
        setListaReceitas={setListaReceitas}
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

export default Receitas;