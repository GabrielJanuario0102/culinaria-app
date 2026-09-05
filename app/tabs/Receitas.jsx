import ListReceitas from "@/src/components/ListReceitas";

import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

const Receitas = () => {
  const API_URL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Brazil";

  const [listaReceitas, setListaReceitas] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        return response.json();
      })
      .then((data) => {
        setListaReceitas(data.meals || []);
      })
      .catch((error) => {
        console.log("Erro no fetch:", error);
      });
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
