import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const userData = response.data.results[0];
      setUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerador de Usuário</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : user ? (
        <View style={styles.userContainer}>
          <Image source={{ uri: user.picture.large }} style={styles.image} />
          <Text style={styles.text}>{`${user.name.first} ${user.name.last}`}</Text>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={styles.text}>{`${user.location.city}, ${user.location.country}`}</Text>
        </View>
      ) : (
        <Text>Carregando dados do usuário...</Text>
      )}
      <Button title="Obter Outro Usuário" onPress={fetchUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 2,
    textAlign: 'center',
  },
});
