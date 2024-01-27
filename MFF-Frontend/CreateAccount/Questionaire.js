import React, { useState } from 'react';
import { ScrollView,
   View, Text,
    TextInput, Button, StyleSheet,
     Platform, TouchableOpacity} 
  from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from "@react-native-community/slider"




const ExerciseFrequencyQuestion = ({ onSelect }) => {
  const options = ['Rarely', 'Sometimes', 'Frequently', 'Everyday'];
  return (
    <View style={styles.card}>
      <Text style={styles.questionTitle}>How often do you exercise?</Text>
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


const FitnessGoalQuestion = ({ onSelect }) => {
  const options = ['Lose weight', 'Maintain weight', 'Build muscle'];
  return (
    <View style={styles.card}>
      <Text style={styles.questionTitle}>What is your fitness goal?</Text>
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


const SleepQuestion = () => {
  const [hoursOfSleep, setHoursOfSleep] = useState(8);

  return (
    <View style={styles.card}>
      <Text style={styles.questionTitle}>How many hours of sleep do you get a day?</Text>
      <Text style={styles.sleepAmount}>{`${hoursOfSleep} hours`}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={16}
        step={1}
        value={hoursOfSleep}
        onValueChange={setHoursOfSleep}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#b9e4c9"
      />
    </View>
  );
};


const Questionnaire = ({navigation}) => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [hoursOfSleep, setHoursOfSleep] = useState(8);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios'); 
    setDateOfBirth(currentDate);
  };

  const handleSubmit = async () => {

    try {
      const questionnaireData = {

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
        body: JSON.stringify(questionnaireData),
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
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>Tell us about yourself!</Text>
      </View> */}

      <View style={styles.card}>
      <Text style={styles.title}>Tell us about yourself!</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onDateChange}
              placeholderText='Select Date'
              textColor='white'
            />
          )}
          {!showDatePicker && (
            <Button title="Select Date" textColor='white' onPress={() => setShowDatePicker(true)} />
          )}
          {/* <Text style={styles.valueText}>{dateOfBirth.toDateString()}</Text> */}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name </Text>
          <View style={styles.inputNameContainer}>
            <TextInput
              style={styles.nameInput}
              value={height}
              onChangeText={setHeight}
              // keyboardType="numeric"
              placeholder='First'
              textColor='white'
              // placeholderTextColor={'white'}
            />
            <Text>  </Text>
            <TextInput
              style={styles.nameInput}
              value={height}
              onChangeText={setHeight}
              // keyboardType="numeric"
              placeholder='Last'
              textColor='white'
              // placeholderTextColor={'white'}
            />
          </View>
          
          
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height </Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder='Enter your height'
            textColor='white'
            // width='20'
            // placeholderTextColor={'white'}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Enter your weight"

          />
        </View>
       
       

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExerciseFrequency')}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>

     
      {/* <ExerciseFrequencyQuestion onSelect={setExerciseFrequency} />
      <FitnessGoalQuestion onSelect={setFitnessGoal} />
      <SleepQuestion /> */}
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
    height: 520,
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
    backgroundColor: '#627D98',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    width: '100%',
  },
  optionText: {
    color: 'white',
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
    paddingVertical: 10,
    borderRadius: 30,
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

export default Questionnaire;
