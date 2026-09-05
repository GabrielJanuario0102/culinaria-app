import React, { useState } from "react";

import {
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  Text,
  View,
} from "react-native";

import ModalEditReceita from "./ModalEditReceita";

const ListReceitas = ({ listaReceitas, setListaReceitas }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const handlePressAdd = () => {
    setItemSelecionado(null);
    setModalVisible(true);
  };

  const handlePressDelete = (id) => {
    const listaAtualizada = listaReceitas.filter(
      (item) => item.idMeal !== id
    );

    setListaReceitas(listaAtualizada);
  };

  const handlePressEdit = (id) => {
    const item = listaReceitas.find(
      (item) => item.idMeal === id
    );

    if (!item) {
      return;
    }

    setItemSelecionado(item);
    setModalVisible(true);
  };

  const handleOnConfirm = (receita) => {
    if (itemSelecionado) {
      const index = listaReceitas.findIndex(
        (item) => item.idMeal === itemSelecionado.idMeal
      );

      if (index === -1) {
        return;
      }

      const novaLista = [...listaReceitas];

      novaLista[index] = {
        ...itemSelecionado,
        ...receita,
      };

      setListaReceitas(novaLista);
    } else {
      setListaReceitas([
        ...listaReceitas,
        receita,
      ]);
    }

    setModalVisible(false);
    setItemSelecionado(null);
  };

  return (
    <>
      <Pressable
        style={styles.buttonAdd}
        onPress={handlePressAdd}
      >
        <Text style={styles.buttonAddText}>
          + Add Receita
        </Text>
      </Pressable>

      <FlatList
        data={listaReceitas}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item, index) =>
          item.idMeal
            ? item.idMeal.toString()
            : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: item.strMealThumb,
              }}
              style={styles.image}
            />

            <Text style={styles.title}>
              {item.strMeal}
            </Text>

            <View style={styles.rowButtons}>
              <Pressable
                onPress={() =>
                  handlePressDelete(item.idMeal)
                }
                style={styles.colButtons}
              >
                <Text style={styles.buttonDelete}>
                  Delete
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  handlePressEdit(item.idMeal)
                }
                style={styles.colButtons}
              >
                <Text style={styles.buttonEdit}>
                  Edit
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <ModalEditReceita
        visible={modalVisible}
        item={itemSelecionado}
        onClose={() => {
          setModalVisible(false);
          setItemSelecionado(null);
        }}
        onConfirm={handleOnConfirm}
      />
    </>
  );
};

const styles = StyleSheet.create({
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

  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },

  colButtons: {
    width: "40%",
    margin: 5,
  },

  buttonDelete: {
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    padding: 8,
  },

  buttonEdit: {
    backgroundColor: "orange",
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    padding: 8,
  },

  buttonAdd: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  buttonAddText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ListReceitas;
