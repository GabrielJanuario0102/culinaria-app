import ListIngredientes from "@/src/components/ListIngredientes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

const Receitas = () => {

    
    const [listaIngredientes, setListaIngredientes] = useState([]);
  
    useEffect(() => {
    const loadIngredientes = async () => {
      try {
        const data = await AsyncStorage.getItem("ingredientes");
        const ingredientes = data != null ? JSON.parse(data): [];
        setListaIngredientes(ingredientes);
        console.log(listaIngredientes);
        
      } catch (error) {
        console.log(error);
      }
    }
    loadIngredientes();
  }, []);

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

export default Receitas;
