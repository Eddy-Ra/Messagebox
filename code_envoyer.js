import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useRoute } from "@react-navigation/native";

const code_envoyer = ({ navigation }) => {
  const [codemail, setcodemail] = useState('');
  const route = useRoute();
  const { mail } = route.params;

  const envoyer = async (mail) => {
    if (!mail) {
      Alert.alert("Erreur", "Adresse e-mail vide !");
      return;
    }

    Alert.alert("Envoi du code...");

    try {
      const response = await fetch("http://192.168.1.44:3000/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail })
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Code reçu", `Le code est : ${data.code}`);
      } else {
        Alert.alert("Erreur", "Impossible d'envoyer le code");
      }
    } catch (e) {
      Alert.alert("Erreur", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={codemail}
        onChangeText={(text) => setcodemail(text)}
        placeholder="codemail"
        placeholderTextColor="white"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => envoyer(mail)}>
        <Text style={styles.buttonText}>Envoyer le code</Text>
      </TouchableOpacity>

      {/* Bouton récupération → créer une autre fonction si nécessaire */}
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Récupération")}>
        <Text style={styles.buttonText}>Récupération</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fond sombre
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    bottom:'20%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom:'15%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default code_envoyer;
