import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput,Alert } from 'react-native';
import { db, ref, set, onValue } from './firebase'

const Recuperation = ({ navigation }) => {
  const [mail, setmail] = useState('');

  const rechercher = () => {
      if (!mail.trim()) {
        Alert.alert('Erreur', "Le nom d'utilisateur ne peut pas être vide");
        return;
      }
    
      const ver = ref(db, 'utilisateurs');
    
      onValue(ver, (snapshot) => {
        const data = snapshot.val();
        let userExists = false;
        for (let key in data) {
          if (data[key].mail === mail) {
            userExists = true;
            navigation.navigate('code_envoyer',{mail});
          }
        }
    
        if (!userExists) {
          Alert.alert('Erreur', 'E-mail incorrect');
          
        }
    
      }, { onlyOnce: true }); // Lire les données une seule fois
    };

  return (
    <View style={styles.container}>
      <TextInput
        value={mail}
        onChangeText={(text) => setmail(text)}
        placeholder="email"
        placeholderTextColor="white"
        style={styles.input}
      />
    
      <TouchableOpacity style={styles.button} onPress={rechercher}>
        <Text style={styles.buttonText}>Rechercher</Text>
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

export default Recuperation;
