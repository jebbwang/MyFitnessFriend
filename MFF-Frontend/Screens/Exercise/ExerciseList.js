import { useState } from 'react';
import React from 'react';
import { SafeAreaView,ScrollView, View, TextInput, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ExerciseList = ({ navigation }) => {
    const [muscle, setMuscle] = useState('');
    const [exercises, setExercises] = useState([]);

    const viewPlan = () => {
        navigation.navigate('WorkoutPlan'); 
      };
    
    const handleSearch = async () => {
      try {
        const response = await fetch(
          'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
          {
            method: 'GET',
            headers: {
              'X-Api-Key': '50Y/9uaDfwp9o6fY4IBaPA==1gCstnMSO4fTY7QJ',
            }
          }
        );
        const data = await response.json();
        setExercises(data); 
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <SafeAreaView style={styles.safeArea}>
        
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#000"
            value={muscle}
            onChangeText={setMuscle}
            onSubmitEditing={handleSearch} 
        />
        <View>
            
        </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Looking for inspiration? Type in a muscle group to see exercise examples</Text>
          <Pressable style={styles.viewPlanButton}>
            <Text style={styles.viewPlanText }onPress={viewPlan}>View Plan</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.exerciseContainer}>
            {exercises.map((exercise, index) => (
              <WorkoutItem key={index} workout={exercise} />
            ))}
          </View>
        </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const WorkoutItem = ({ workout }) => {
    const { name, type, instructions, difficulty, equipment } = workout;
    const [status, setStatus] = useState('add'); 
    const [showInstructions, setShowInstructions] = useState(false);
    const buttonBackgroundColor = status === 'add' ? '#9C9C9C' : '#5DB06F'; 

    const handleAdd = () => {
        setStatus((currentStatus) => (currentStatus === 'add' ? 'check' : 'add'));
    };
    const toggleExpand = () => {
        setShowInstructions((prevExpanded) => !prevExpanded);
    };
    
    return (
        <View style={styles.listFormat}>
        <Pressable style={styles.workoutItem}>
          <View style={styles.workoutInfo}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.type}>{type}</Text>
            <Pressable style={styles.instructions} onPress={toggleExpand}>
                <Text>{showInstructions ? "Close Tab" : "View Additional Info"}</Text>
          </Pressable>
            {showInstructions && (
                <View style={styles.additionalInfo}> 
                    <Text>Difficulty: {difficulty}</Text>
                    <Text>Equipment: {equipment}</Text>
                </View>
            
          )}
          </View>

        </Pressable>
        <Pressable
            style={[styles.actionButton, { backgroundColor: buttonBackgroundColor }]}
            onPress={handleAdd}
        >
            <Icon
            name={status === 'check' ? 'check' : 'add'}
            size={24}
            color="#FFF" 
            />
        </Pressable>

        </View>
      );
};
  

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#07203A',
  },
  container: {
    flex: 1,
    padding: 16,

  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    padding: 16,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
  },
  closeModalText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: "bold",
  },
  viewPlanButton: {
    backgroundColor: '#3E89E1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewPlanText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
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
  additionalInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    fontSize: 15,
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