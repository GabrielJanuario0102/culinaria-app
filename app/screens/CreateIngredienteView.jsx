import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateIngredienteView = () => {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [id, setId] = useState("");

  const handleAdicionar = async () => {
    if (!nome.trim() || !imagem.trim() || !id.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      const dados = await AsyncStorage.getItem("ingredientes");
      const lista = dados ? JSON.parse(dados) : [];

      const existe = lista.some((item) => String(item.id) === id.trim());

      if (existe) {
        Alert.alert("Atenção", "Já existe um ingrediente com esse ID.");
        return;
      }

      const novoIngrediente = {
        id: id.trim(),
        nome: nome.trim(),
        imagem: imagem.trim(),
      };

      const novaLista = [...lista, novoIngrediente];

      await AsyncStorage.setItem("ingredientes", JSON.stringify(novaLista));

      Alert.alert("Sucesso", "Ingrediente adicionado!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o ingrediente.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Adicionar Ingrediente</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do ingrediente</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome do ingrediente"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>URL da imagem</Text>
        <TextInput
          style={styles.input}
          value={imagem}
          onChangeText={setImagem}
          placeholder="Digite a URL da imagem"
          autoCapitalize="none"
          keyboardType="url"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
          placeholder="Digite o ID do ingrediente"
        />
      </View>

      <Pressable style={styles.buttonAdicionar} onPress={handleAdicionar}>
        <Text style={styles.buttonText}>Adicionar Ingrediente</Text>
      </Pressable>

      <Pressable style={styles.buttonCancelar} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  formGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 5,
  },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 15,
    color: "#222",
  },

  buttonAdicionar: {
    backgroundColor: "#198754",
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonCancelar: {
    backgroundColor: "#777",
    padding: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default CreateIngredienteView;
