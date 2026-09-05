import React, { useEffect, useState } from "react";

import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

const ModalEditReceita = ({
  visible,
  item,
  onClose,
  onConfirm,
}) => {
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
    if (
      nome.trim() === "" ||
      imagem.trim() === "" ||
      id.trim() === ""
    ) {
      return;
    }

    const receita = {
      idMeal: id.trim(),
      strMeal: nome.trim(),
      strMealThumb: imagem.trim(),
    };

    onConfirm(receita);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {modoEdicao
              ? "Editar Receita"
              : "Adicionar Receita"}
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Nome da receita
            </Text>

            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o nome da receita"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              URL da imagem
            </Text>

            <TextInput
              style={styles.input}
              value={imagem}
              onChangeText={setImagem}
              placeholder="Digite a URL da imagem"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              ID
            </Text>

            <TextInput
              style={styles.input}
              value={id}
              onChangeText={setId}
              placeholder="Digite o ID da receita"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonCancel}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              style={styles.buttonConfirm}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>
                {modoEdicao
                  ? "Salvar"
                  : "Adicionar"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#212529",
  },

  formGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#212529",
    fontWeight: "500",
  },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#212529",
    backgroundColor: "#fff",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 10,
  },

  buttonCancel: {
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },

  buttonConfirm: {
    backgroundColor: "#0d6efd",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default ModalEditReceita;
