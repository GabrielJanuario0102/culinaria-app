import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { FlatList, Text, View } from "react-native";

const Receitas = () => {
  const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Brazil";
  let [listaReceitas, setListaReceitas] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        return response.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        setListaReceitas(data.meals);
      })
      .catch((error) => {
        console.log("Erro no fetch:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={listaReceitas}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 35,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 150,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    padding: 10,
    color: "#333",
  },
});

export default Receitas;
