import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../supabase.js';


const EndScreen = ({ route }) => {
    const { handleUserCompletion } = route.params;
    

    const handleNext = () => {

        // Update the state to indicate that the user has completed the initial pages
        if (handleUserCompletion) {
            handleUserCompletion();
          }

        /* 
            Don't need this in order naviate to Dashboard since handleUserCompletion is set to 'true'.
            Automatically redirects to screen that is supposed to appear when handleUserCompletion is set to 'true'. 

        */
         // Navigate to the Dashboard screen
        //  navigation.navigate('Dashboard');
    };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Congrats!</Text>
          

        </View>
        <Text style={styles.subtext}>You've completed the questions!</Text>
        <Text style={styles.description}>Get ready to embark on your new fitness journey alongside your very own Fitness Friend. Click 'continue' to get started!</Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continue</Text>
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

export default EndScreen;
