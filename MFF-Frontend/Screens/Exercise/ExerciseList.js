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
    const [status, setStatus] = useState("add");

    const handleTouchWorkout =  () => {
        setStatus((cur) => (cur === "add" ? 'check' : 'add'))
    }
    const handleAdd = () => {
        setStatus('add')
    }
    return (
        <View style={styles.listFormat}>
        <TouchableOpacity style={styles.workoutItem} onPress={handleTouchWorkout}>
          <View style={styles.workoutInfo}>
            <Text style={styles.title}>{workoutTitle}</Text>
            <Text style={styles.type}>{workoutType}</Text>
            <TouchableOpacity style={styles.instructions}>
                <Text>View Additional Info</Text>
            </TouchableOpacity>
           
          </View>

        </TouchableOpacity>
        <View style={styles.status}>
                  <Text>Add exercise</Text>
        </View>
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
  status: {
    backgroundColor: "green",
    width: "25%",
    padding: 10,
    marginLeft: 70,
    borderRadius: 30,
    height: 40,
    marginTop: 45,
  },
  exerciseContainer: {
    backgroundColor: "red",
  },
  workoutItem: {
    backgroundColor: '#475E78',
    marginBottom: 30,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  listFormat: {
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    justifyContent: "center"

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
  },
  add: {
    backgroundColor: "#fff",
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 10,
  },
});

export default ExerciseList;