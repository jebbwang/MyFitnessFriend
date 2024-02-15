import { useState } from 'react';
import React from 'react';
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const workoutData = [
    {
      workoutTitle: 'Chest Press',
      workoutType: 'Strength Training',
      instructions: '3 sets of 12 reps',
    },
    {
      workoutTitle: 'Jog/Walk',
      workoutType: 'Cardio Training',
      instructions: '15 minutes at a moderate pace',
    },
    {
      workoutTitle: 'Chest Press',
      workoutType: 'Cross Training',
      instructions: '3 sets of 10 reps with cross cables',
    },
    {
        workoutTitle: 'Bicep Curl',
        workoutType: 'Strength Training',
        instructions: '3 sets of 10 reps with cross cables',
      },
  ];
  

const ExerciseList = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for workout"
            placeholderTextColor="#000"
          />
        <View>
            
        </View>
        </View>
  
        <View style={styles.exerciseContainer}>
            {workoutData.map((workout, index) => (
            <WorkoutItem key={index} workout={workout} />
            ))}
        </View>
    </View>
    </SafeAreaView>
  );
};

const WorkoutItem = ({ workout }) => {
    const { workoutTitle, workoutType, instructions } = workout;
    const [status, setStatus] = useState('add'); 
    const buttonBackgroundColor = status === 'add' ? '#9C9C9C' : 'green'; 


    const handleAdd = () => {
        setStatus((currentStatus) => (currentStatus === 'add' ? 'check' : 'add'));
      };
    return (
        <View style={styles.listFormat}>
        <TouchableOpacity style={styles.workoutItem}>
          <View style={styles.workoutInfo}>
            <Text style={styles.title}>{workoutTitle}</Text>
            <Text style={styles.type}>{workoutType}</Text>
            <TouchableOpacity style={styles.instructions}>
                <Text>View Additional Info</Text>
            </TouchableOpacity>
           
          </View>

        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: buttonBackgroundColor }]}
            onPress={handleAdd}
        >
            <Icon
            name={status === 'check' ? 'check' : 'add'}
            size={24}
            color="#FFF" 
            />
        </TouchableOpacity>

        </View>
      );
  };
  

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2633',
  },
  container: {
    flex: 1,
    padding: 16,

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginBottom: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },
  listFormat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 30, 
  },
  workoutItem: {
    flex: 0.8, 
    backgroundColor: '#475E78',
    padding: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  status: {
    flex: 0.2,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseContainer: {
    //backgroundColor: "red",
    flex: "row",

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  type: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  instructions: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    borderColor: "#fff",
    width: "70%"
  },
  add: {
    backgroundColor: "#fff",
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonIcon: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
  },
  actionButton: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#514D4D', 
    justifyContent: 'center',
    alignItems: 'center', 
  },
});

export default ExerciseList;