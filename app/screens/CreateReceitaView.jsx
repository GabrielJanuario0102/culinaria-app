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

const CreateReceitaView = () => {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [id, setId] = useState("");

  const handleAdicionar = async () => {
    if (!nome.trim() || !imagem.trim() || !id.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      const dados = await AsyncStorage.getItem("receitas");
      const lista = dados ? JSON.parse(dados) : [];

      const existe = lista.some((item) => String(item.idMeal) === id.trim());

      if (existe) {
        Alert.alert("Atenção", "Já existe uma receita com esse ID.");
        return;
      }

      const novaReceita = {
        idMeal: id.trim(),
        strMeal: nome.trim(),
        strMealThumb: imagem.trim(),
      };

      const novaLista = [...lista, novaReceita];

      await AsyncStorage.setItem("receitas", JSON.stringify(novaLista));

      Alert.alert("Sucesso", "Receita adicionada!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar a receita.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Adicionar Receita</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome da receita</Text>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome da receita"
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
          placeholder="Digite o ID da receita"
        />
      </View>

      <Pressable style={styles.buttonAdicionar} onPress={handleAdicionar}>
        <Text style={styles.buttonText}>Adicionar Receita</Text>
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

export default CreateReceitaView;
