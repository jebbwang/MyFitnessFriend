import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome to {'\n'} My Fitness Friend!</Text>
          

        </View>
        <Text style={styles.subtext}>Fitness just got easier!</Text>
        <Text style={styles.description}>Personalize your experience by answering a few quick, fun questions. Let's make your time here uniquely yours!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Questionaire1')}>
          <Text style={styles.buttonText}>Let's do this!</Text>
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
    backgroundColor: '#3E89E1',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: '800',
    color: 'white', 
    marginBottom: 50,
    textAlign: 'center'
    // width: 300
  },
  headerContainer: {
    // width: 350,
    // backgroundColor: '#FFA500'
  },
  subtext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: 'white', 
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
  }
});

export default WelcomePage;
