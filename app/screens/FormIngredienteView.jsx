import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormIngredienteView = () => {
  const { ingredienteId } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [id, setId] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarIngrediente = async () => {
      try {
        const dados = await AsyncStorage.getItem("ingredientes");
        const lista = dados ? JSON.parse(dados) : [];

        const encontrado = lista.find(
          (item) => String(item.id) === String(ingredienteId),
        );

        if (encontrado) {
          setNome(encontrado.nome || "");
          setImagem(encontrado.imagem || "");
          setId(String(encontrado.id || ""));
        } else {
          Alert.alert("Erro", "Ingrediente não encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar o ingrediente.");
      } finally {
        setCarregando(false);
      }
    };

    carregarIngrediente();
  }, [ingredienteId]);

  const handleAtualizar = async () => {
    if (!nome.trim() || !imagem.trim() || !id.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      setSalvando(true);

      const dados = await AsyncStorage.getItem("ingredientes");
      const lista = dados ? JSON.parse(dados) : [];

      const existe = lista.some(
        (item) =>
          String(item.id) === id.trim() &&
          String(item.id) !== String(ingredienteId),
      );

      if (existe) {
        Alert.alert("Atenção", "Já existe outro ingrediente com esse ID.");
        return;
      }

      const novaLista = lista.map((item) => {
        if (String(item.id) === String(ingredienteId)) {
          return {
            ...item,
            id: id.trim(),
            nome: nome.trim(),
            imagem: imagem.trim(),
          };
        }

        return item;
      });

      await AsyncStorage.setItem("ingredientes", JSON.stringify(novaLista));

      Alert.alert("Sucesso", "Ingrediente atualizado!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o ingrediente.");
    } finally {
      setSalvando(false);
    }
  };

  const excluirIngrediente = async () => {
    try {
      const dados = await AsyncStorage.getItem("ingredientes");
      const lista = dados ? JSON.parse(dados) : [];

      const novaLista = lista.filter(
        (item) => String(item.id) !== String(ingredienteId),
      );

      await AsyncStorage.setItem("ingredientes", JSON.stringify(novaLista));

      Alert.alert("Sucesso", "Ingrediente excluído!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o ingrediente.");
    }
  };

  const handleExcluir = () => {
    Alert.alert("Excluir ingrediente", `Deseja excluir "${nome}"?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: excluirIngrediente,
      },
    ]);
  };

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#333" />
        <Text style={styles.auxiliar}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Ingrediente</Text>

      {imagem.trim() !== "" && (
        <Image
          source={{ uri: imagem }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome do ingrediente"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>URL da imagem</Text>
        <TextInput
          style={styles.input}
          value={imagem}
          onChangeText={setImagem}
          placeholder="URL da imagem"
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
          placeholder="ID do ingrediente"
        />
      </View>

      <Pressable
        style={[styles.button, styles.salvar]}
        onPress={handleAtualizar}
        disabled={salvando}
      >
        <Text style={styles.buttonText}>
          {salvando ? "Salvando..." : "Atualizar ingrediente"}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.excluir]}
        onPress={handleExcluir}
        disabled={salvando}
      >
        <Text style={styles.buttonText}>Excluir ingrediente</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.voltar]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
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

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },

  auxiliar: {
    marginTop: 8,
    color: "#555",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#e5e5e5",
    marginBottom: 16,
  },

  formGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: "600",
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

  button: {
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },

  salvar: {
    backgroundColor: "#333",
  },

  excluir: {
    backgroundColor: "#c62828",
  },

  voltar: {
    backgroundColor: "#777",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default FormIngredienteView;
