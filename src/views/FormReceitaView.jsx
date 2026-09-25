import React, { useEffect, useState } from "react";

import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

const EditReceita = ({}) => {
  let item = useState({ nome: "", imagem: "", id: "" });
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [id, setId] = useState("");

  const modoEdicao = item !== null;

  useEffect(() => {
    if (item) {
      setNome(item.strMeal || "");
      setImagem(item.strMealThumb || "");
      setId(item.idMeal || "");
    } else {
      setNome("");
      setImagem("");
      setId("");
    }
  }, [item]);

  const handleConfirm = () => {
    if (nome.trim() === "" || imagem.trim() === "" || id.trim() === "") {
      return;
    }

    const receita = {
      idMeal: id.trim(),
      strMeal: nome.trim(),
      strMealThumb: imagem.trim(),
    };

    if (onConfirm) {
      onConfirm(receita);
    }
  };

  const handleCancel = () => {};

  return (
      <View>
        <Text style={styles.title}>
          {modoEdicao ? "Editar Receita" : "Adicionar Receita"}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome da receita</Text>

          <TextInput
            style={styles.input}
            value={item ? item.nome : ""}
            onChangeText={setNome}
            placeholder="Digite o nome da receita"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>URL da imagem</Text>

          <TextInput
            style={styles.input}
            value={item ? item.imagem : ""}
            onChangeText={setImagem}
            placeholder="Digite a URL da imagem"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>ID</Text>

          <TextInput
            style={styles.input}
            value={item ? item.id : ""}
            onChangeText={setId}
            placeholder="Digite o ID da receita"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonCancel} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </Pressable>

          <Pressable style={styles.buttonConfirm} onPress={handleConfirm}>
            <Text style={styles.buttonText}>
              {modoEdicao ? "Salvar" : "Adicionar"}
            </Text>
          </Pressable>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    justifyContent: "center",
  },

  formContainer: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 25,
  },

  formGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#fafafa",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
    gap: 12,
  },

  buttonCancel: {
    flex: 1,
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 7,
    alignItems: "center",
  },

  buttonConfirm: {
    flex: 1,
    backgroundColor: "#198754",
    paddingVertical: 12,
    borderRadius: 7,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditReceita;
