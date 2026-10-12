import React from "react";

import {
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

const ListIngredientes = ({ listaIngredientes = [] }) => {
  const navigateToDetails = (ingrediente) => {
    router.push({
      pathname: "/screens/FormIngredienteView",
      params: {
        ingredienteId: ingrediente.id,
      },
    });
  };

  const handlePressAdd = () => {
    router.push("/screens/CreateIngredienteView");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonAdd} onPress={handlePressAdd}>
        <Text style={styles.buttonAddText}>+ Adicionar Ingrediente</Text>
      </Pressable>

      <FlatList
        data={listaIngredientes}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item, index) =>
          item.id ? String(item.id) : String(index)
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />

            <Text style={styles.title}>{item.nome}</Text>

            <View style={styles.rowButtons}>
              <Pressable
                onPress={() => navigateToDetails(item)}
                style={styles.colButtons}
              >
                <Text style={styles.buttonDetails}>Detalhes</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    padding: 10,
    color: "#333",
  },

  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },

  colButtons: {
    width: "90%",
    margin: 5,
  },

  buttonDetails: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: 9,
  },

  buttonAdd: {
    backgroundColor: "#198754",
    padding: 12,
    marginBottom: 15,
  },

  buttonAddText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  empty: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },
});

export default ListIngredientes;
