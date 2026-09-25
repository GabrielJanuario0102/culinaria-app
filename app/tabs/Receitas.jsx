import ListReceitas from "@/src/components/ListReceitas";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

const Receitas = () => {

  const [listaReceitas, setListaReceitas] = useState([]);

  useEffect(() => {
    const loadReceitas = async () => {
      try {
        const data = await AsyncStorage.getItem("receitas");
        const receitas = data != null ? JSON.parse(data): [];
        setListaReceitas(receitas);
        console.log(listaReceitas);
        
      } catch (error) {
        console.log(error);
      }
    }
    loadReceitas();
  }, []);

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
