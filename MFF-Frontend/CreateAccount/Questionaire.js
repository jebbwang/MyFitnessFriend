import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
const Questionaire = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState(null);

  return (
    <View style={{backgroundColor: "#3E89E1"}}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Let's get started</Text>
        </View>
        <View style={styles.inputContainer}>

            <Text style={styles.label}>Age:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAge}
                value={age}

                keyboardType="numeric"
            />

            <Text style={styles.label}>Weight:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Height:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.genderContainer}>
            <TouchableOpacity
                style={[styles.genderButton, gender === 'male' && styles.selectedGenderButton]}
                onPress={() => setGender('male')}
            >
                <Text style={styles.genderButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.genderButton, gender === 'female' && styles.selectedGenderButton]}
                onPress={() => setGender('female')}
            >
                <Text style={styles.genderButtonText}>Female</Text>
            </TouchableOpacity>


            </View>
        </View>
        <View style={{backgroundColor: "#3E89E1", height:"30%"}}>
            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextButtonText}>→</Text>
            </TouchableOpacity>
        </View>
  
    </View>


  );
}

const styles = StyleSheet.create({
    inputContainer: {
      padding: 20,
      backgroundColor: '#3E89E1',
      height: "60%",
    },
    header: {
        backgroundColor: "#FFA337",
        marginTop: 20,
        marginRight: 40,
        padding: 10,
        borderBottomRightRadius: "10%",
       
      },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
   
        textAlign: 'left',
        marginLeft: 10, 
        
      },
    label: {
      marginBottom: 5,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333'
    },
    input: {
      marginBottom: 15,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 16
    }, 

      genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
      },
      genderButton: {
        backgroundColor: '#e7e7e7',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        flexGrow: 1,
        marginHorizontal: 5,
      },
      selectedGenderButton: {
        backgroundColor: '#014EAA',
      },
      genderButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
      },
      nextButton: {
        backgroundColor: '#FFA500', 
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        padding: 15,
        alignSelf: 'flex-end',
        width: "40%",
        marginRight: 0,
      },
      nextButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: "center"
      },
      
  });
  


export default Questionaire;
