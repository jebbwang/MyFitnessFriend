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
        </View>
        {workoutData.map((workout, index) => (
          <WorkoutItem key={index} workout={workout} />
        ))}

      </View>
    </SafeAreaView>
  );
};

const WorkoutItem = ({ workout }) => {
    const { workoutTitle, workoutType, instructions } = workout;
  
    return (
      <View style={styles.workoutItem}>
        <View style={styles.workoutInfo}>
          <Text style={styles.title}>{workoutTitle}</Text>
          <Text style={styles.type}>{workoutType}</Text>
          <Text style={styles.instructions}>{instructions}</Text>
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
  workoutItem: {
    backgroundColor: '#475E78',
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  type: {
    fontSize: 14,
    color: '#3a3a3c',
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