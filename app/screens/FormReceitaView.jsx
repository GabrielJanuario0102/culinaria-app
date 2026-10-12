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

const FormReceitaView = () => {
  const { receitaId } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [id, setId] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarReceita = async () => {
      try {
        const dados = await AsyncStorage.getItem("receitas");
        const lista = dados ? JSON.parse(dados) : [];

        const encontrada = lista.find(
          (item) => String(item.idMeal) === String(receitaId),
        );

        if (encontrada) {
          setNome(encontrada.strMeal || "");
          setImagem(encontrada.strMealThumb || "");
          setId(String(encontrada.idMeal || ""));
        } else {
          Alert.alert("Erro", "Receita não encontrada.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar a receita.");
      } finally {
        setCarregando(false);
      }
    };

    carregarReceita();
  }, [receitaId]);

  const handleAtualizar = async () => {
    if (!nome.trim() || !imagem.trim() || !id.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      setSalvando(true);

      const dados = await AsyncStorage.getItem("receitas");
      const lista = dados ? JSON.parse(dados) : [];

      const novaLista = lista.map((item) => {
        if (String(item.idMeal) === String(receitaId)) {
          return {
            ...item,
            idMeal: id.trim(),
            strMeal: nome.trim(),
            strMealThumb: imagem.trim(),
          };
        }

        return item;
      });

      await AsyncStorage.setItem("receitas", JSON.stringify(novaLista));

      Alert.alert("Sucesso", "Receita atualizada!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a receita.");
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = () => {
    Alert.alert("Excluir receita", `Deseja excluir "${nome}"?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: excluirReceita,
      },
    ]);
  };

  const excluirReceita = async () => {
    try {
      const dados = await AsyncStorage.getItem("receitas");
      const lista = dados ? JSON.parse(dados) : [];

      const novaLista = lista.filter(
        (item) => String(item.idMeal) !== String(receitaId),
      );

      await AsyncStorage.setItem("receitas", JSON.stringify(novaLista));

      Alert.alert("Sucesso", "Receita excluída!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a receita.");
    }
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#333" />
        <Text style={styles.textoAuxiliar}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar receita</Text>

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
          placeholder="Nome da receita"
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
          placeholder="ID da receita"
        />
      </View>

      <Pressable
        style={[styles.button, styles.buttonSalvar]}
        onPress={handleAtualizar}
        disabled={salvando}
      >
        <Text style={styles.buttonText}>
          {salvando ? "Salvando..." : "Atualizar receita"}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonExcluir]}
        onPress={handleExcluir}
        disabled={salvando}
      >
        <Text style={styles.buttonText}>Excluir receita</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonVoltar]}
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

  buttonSalvar: {
    backgroundColor: "#333",
  },

  buttonExcluir: {
    backgroundColor: "#c62828",
  },

  buttonVoltar: {
    backgroundColor: "#777",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  textoAuxiliar: {
    marginTop: 8,
    color: "#555",
  },
});

export default FormReceitaView;
