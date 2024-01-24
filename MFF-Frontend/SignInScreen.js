import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

function SignInScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.question}>How often do you exercise?</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Rarely</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sometimes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Frequently</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Everyday</Text> 
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#014EAA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    },
button: {
    backgroundColor: '#3E89E1',
    padding: 15,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    marginBottom: 10,
    },
buttonText: {
    fontSize: 16,
    color: '#FFFFFF', 
    paddingBottom: 5,
    fontFamily: 'Inter-Bold',
    },
question: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Inter-Bold',
    },
});

export default SignInScreen;
