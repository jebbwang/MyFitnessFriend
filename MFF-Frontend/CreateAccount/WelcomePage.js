import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Let's get started!</Text>
        <Text style={styles.subtext}>Welcome to MyFitnessFriend!</Text>
        <Text style={styles.description}>Personalize your experience by answering a few quick, fun questions. Let's make your time here uniquely yours!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Questionaire')}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014EAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: "#f2a838",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000', 
    marginBottom: 50,
  },
  subtext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#000', 
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#fcc777",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    color: '#000', 
  }
});

export default WelcomePage;