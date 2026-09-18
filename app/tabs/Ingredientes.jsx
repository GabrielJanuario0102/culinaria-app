import ListIngredientes from "@/src/components/ListIngredientes";

import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

const Receitas = () => {

    
    const [listaIngredientes, setListaIngredientes] = useState([]);
  
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
