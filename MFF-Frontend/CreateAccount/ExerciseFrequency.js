import React, { useState } from 'react';
import { ScrollView,
   View, Text,
    TextInput, Button, StyleSheet,
     Platform, TouchableOpacity} 
  from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from "@react-native-community/slider"




const ExerciseFreq = ({ onSelect }) => {
  const options = ['Rarely', 'Sometimes', 'Frequently', 'Everyday'];
  return (
    <View >
      {/* <Text style={styles.questionTitle}>How often do you exercise?</Text> */}
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.optionButton}
          onPress={() => onSelect(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};




const ExerciseFrequencyQuestion = ({navigation, onSelect}) => {
  const options = ['Rarely', 'Sometimes', 'Frequently', 'Everyday'];

  const [exerciseFrequency, setExerciseFrequency] = useState('');

  const handleSubmit = async () => {

    try {
      const exerciseFreqData = {

      };
  
      /*
        Will have different variations of POST requests (one for each question page):
          - submit userData
          - submit exerciseFreqData
          - etc.
      */
      const response = await fetch('http://localhost:3000/submit-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseFreqData),
      });
  
      const jsonResponse = await response.json();
      console.log(jsonResponse);

    } catch (error) {
      console.error(error);
    }
   // navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
      <Text style={styles.title}>How often do you exercise?</Text>
      
        <ExerciseFreq onSelect={setExerciseFrequency} />

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HoursOfSleep')}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
     

      {/* <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#014EAA",
    // paddingTop: 60,
    justifyContent: 'center',
    // alignItems: 'center'

  },
  titleContainer: {
    backgroundColor: '#fcc777',
    // marginRight: 30,
    height: 60,
    // paddingLeft: ,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20'

  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: 'white',
    marginBottom: 40,
    // marginTop: 10
  },
  inputContainer: {
    width: 300,
    // flex: 1,
    marginBottom: 15,
    // justifyContent: 'flex-start'
  },
  inputNameContainer: {
    width: 300,
    // flex: 1,
    marginBottom: 15,
    // rowGap: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'

  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: 146,
    borderRadius: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#3E89E1',
    borderRadius: 20,
    height: 420,
    padding: 20,
    marginBottom: 50,
    // marginTop: 40,
    alignItems: 'center',
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  optionButton: {
    // backgroundColor: '#fcc777',
    borderWidth: 2,
    borderColor: 'white',
    // borderBottomColor
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    height: 50,
    marginVertical: 5,
    width: 200,
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  sleepAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    // marginTop: 40,
    backgroundColor: "#fcc777",
    
    paddingHorizontal: 30,
    // width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 30,
    // marginBottom: 
  },
  buttonText: {
    fontSize: 28,
    color: 'white', 
  },
  buttonContainer: {
    // marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 20,
    // marginBottom: 20
    // backgroundColor: "#434c57",
    color: "white"
  },
});

export default ExerciseFrequencyQuestion;
