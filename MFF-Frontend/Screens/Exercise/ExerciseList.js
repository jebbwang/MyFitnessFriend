import { useState, useEffect } from 'react';
import React from 'react';
import { SafeAreaView,ScrollView, View, TextInput, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import SelectDropdown from 'react-native-select-dropdown'
import levenshtein from 'fast-levenshtein'
import { SelectList } from 'react-native-dropdown-select-list'
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewPlanModal from '../Dashboard/modals/ViewPlanModal';



const ExerciseList = ({ handleClose, items, exerciseInfo, updateExerciseInfo, handleAddItems, handleRemove, completedWorkouts, handleSetCompletedWorkouts }) => {
    const [muscle, setMuscle] = useState('');
    const [closestMuscle, setClosestMuscle] = useState('')
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([])


    const muscleTypes = [
      { label: "Abdominals", value: 'abdominals' },
      { label: "Abductors", value: "abductors" },
      { label: "Adductors", value: 'adductors' },
      { label: 'Biceps', value: "biceps" },
      { label: 'Calves', value: "calves" },
      { label: 'Chest', value: "chest" },
      { label: 'Forearms', value: "forearms" },
      { label: 'Glutes', value: "glutes" },
      { label: 'Hamstrings', value: "hamstrings" },
      { label: 'Lats', value: "lats" },
      { label: 'Lower Back', value: "lower_back" },
      { label: 'Middle Back', value: "middle_back" },
      { label: 'Neck', value: "neck" },
      { label: 'Quadriceps', value: "quadriceps" },
      { label: 'Traps', value: "traps" },
      { label: 'Triceps', value: "triceps" },
    ];
    
    const exerciseTypes = [
      { label: 'Cardio', value: 'cardio' },
      { label: 'Olympic Weightlifting', value: 'olympic_weightlifting' },
      { label: 'Plyometrics', value: 'plyometrics' },
      { label: 'Powerlifting', value: 'powerlifting' },
      { label: 'Strength', value: 'strength' },
      { label: 'Stretching', value: 'stretching' },
      { label: 'Strongman', value: 'strongman' },
    ];
    
    const difficultyTypes = [
      { label: 'Beginner', value: 'beginner' },
      { label: 'Intermediate', value: 'intermediate' },
      { label: 'Expert', value: 'expert' },
    ];

    const viewPlan = () => {
        navigation.navigate('WorkoutPlan'); 
      };

    findClosestLevenshtein = () => { 
      let minDistance = Infinity;

      muscleTypes.forEach((option) => {
        const distance = levenshtein.get(muscle, option.label)
        
        if (distance < minDistance) {
          console.log('muscle: ' + muscle)
          console.log('option.label: ' + option.label)

          minDistance = distance
          setClosestMuscle(option.value)
        }
      })
      console.log(closestMuscle)
    }

    handleSetMuscle = (value) => {
      setMuscle(value)
      findClosestLevenshtein()
    }
    
    const handleSearch = async () => {
      try {
        const response = await fetch(
          'https://api.api-ninjas.com/v1/exercises?muscle=' + closestMuscle,
          {
            method: 'GET',
            headers: {
              'X-Api-Key': "50Y/9uaDfwp9o6fY4IBaPA==1gCstnMSO4fTY7QJ"
            }
          }
        );
        const data = await response.json();
        setExercises(data); 
        setFilteredExercises(data);
      } catch (error) {
        console.error(error);
      }
    };



  return (
    <SafeAreaView style={styles.safeArea}>
        
      <View style={styles.container}>
        {/* <Text style={styles.titleText}>
          Type in a muscle group to get started
        </Text> */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={25} color="#000" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a muscle (e.g. 'bicep')"
              placeholderTextColor="#000"
              value={muscle}
              onChangeText={(newText) => handleSetMuscle(newText)} // allows it so that multiple args can be passed to callback
              // onSubmitEditing={handleSearch} 
            />
          </View>
          
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.viewPlanText }>Search</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.header}>
          <Text style={styles.headerTitle}>{ closestMuscle ? 'Results shown for: ' + closestMuscle : 'Search to display results.'}</Text>
          {/* <Pressable style={styles.viewPlanButton}>
            <Text style={styles.viewPlanText }onPress={viewPlan}>View Plan</Text>
          </Pressable> */}
          <View style={styles.dropdown}>
              <RNPickerSelect
                  style={styles.picker}
                  onValueChange={(value) => setFilteredExercises(exercises.filter((item) => {
                   
                    const difficultyTypeMatch = !value || item.difficulty === value;
                
                    return difficultyTypeMatch;
                  }))}
                  items={difficultyTypes}
                  placeholder={{label: 'Select Difficulty', value: 'select_muscle'}}
                  textInputProps={{color: 'white', textAlign: 'center', fontWeight: '700'}}
                                                                                                                                             
              />
            </View>
        </View>
        <ScrollView style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.exerciseContainer}>
            
            {filteredExercises.map((exercise, index) => (
              <WorkoutItem key={index} workout={exercise} items={items} handleAddItems={handleAddItems} handleRemove={handleRemove}/>
            ))}
          </View>
        </ScrollView>

       
        
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <ViewPlanModal items={items} exerciseInfo={exerciseInfo} updateExerciseInfo={updateExerciseInfo} handleAddItems={handleAddItems} completedWorkouts={completedWorkouts} handleSetCompletedWorkouts={handleSetCompletedWorkouts}/>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.viewPlanText }>Close</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const WorkoutItem = ({ workout, items, handleAddItems, handleRemove }) => {
    const { name, type, instructions, difficulty, equipment } = workout;
    const [status, setStatus] = useState('add'); 
    const [showInstructions, setShowInstructions] = useState(false);
    const [completed, setCompleted] = useState(new Array(items.length).fill(0))
    const [currentDate, setCurrentDate] = useState(new Date());
    // const [selectedItems, setSelectedItems] = useState([]);
    // const [added, setAdded] = useState(false);

    const buttonBackgroundColor = status === 'add' ? '#9C9C9C' : '#5DB06F'; 

    // const removeItemFromList = (itemToRemove) => {
    //   // Use the filter method to create a new array without the item to remove
    //   const updatedItems = selectedItems.filter(item => item !== itemToRemove);
    //   setSelectedItems(updatedItems);
    // };

    const handleAdd = (key ) => {
        setStatus((currentStatus) => (currentStatus === 'add' ? 'check' : 'add'));
 
        // const newItem = {
        //   id: key,
        //   date: currentDate.toLocaleString(), 
        //   workout: items,
        //   completed: completed
        // }

        
        if (status === 'add') {
          handleAddItems(name);
        }
        else {
          // TODO: implement remove method when user adds workout but deselects it
          handleRemove(name);
        }
        // console.log(newItem);
        // console.log(items);
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
            onPress={() => handleAdd(1)}
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

// export default ExerciseList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A2633',
  },
  container: {
    flex: 1,
    padding: 18,

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
    // width: 150,
    marginBottom: 20,
  },
  headerTitle: {
    width: 180,
    textAlign:'flex-start',
    fontSize: 14,
    color: '#fff',
    fontWeight: "bold",
  },
  viewPlanButton: {
    backgroundColor: '#3E89E1',
    height: 40,
    width: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    // marginTop: 25,
    alignSelf: 'center',

  },
  closeButton: {
    backgroundColor: 'gray',
    height: 40,
    width: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    // marginTop: 25,
    alignSelf: 'center',

  },
  searchButton: {
    backgroundColor: '#3E89E1',
    height: 'auto',
    width: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // marginLeft: 45,
    // alignSelf: 'flex-end'
  },
  viewPlanText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
  },
  searchContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    // padding: 10,
    // marginVertical: 10,
    // marginBottom: 10,
  },
  searchBar: {
    width: 280,
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 9,
    // marginVertical: 10,
    // marginBottom: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '800',
    color: 'white',
    padding: 5,
    marginBottom: 10,
    // marginTop: 10,

    width: 320,
    // marginLeft: 30,
    marginRight: 30,

    alignSelf: 'flex-start',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    // textShadowOffset: { height: 3, width: 1 }, // Shadow offset (width, height)
    // textShadowRadius: 6, // Shadow blur radius
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 2,
    // marginLeft: 5,
    backgroundColor: '#273646',
    borderWidth: 1,
    borderColor: 'white',
    // fontSize: 15,
    // alignSelf: 'center',
    height: 45,
    width: 150,
    borderColor: 'white',
    // borderWidth: 2,
    // padding:,
    borderRadius: 12,
    color: "white",
    alignItems: 'center'

},
picker: {
  // width: 300,
  marginLeft: 10,
  alignSelf: 'center',
  color: 'white'
},
  dropdownText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700'
},
  muscleFilterDropdown: {
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row'
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
  scrollViewContainer: {
    height: 500,
  },
  workoutItem: {
    flex: 0.8, 
    backgroundColor: '#273646',
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
  button: {
    borderRadius: 20,
    // marginHorizontal: 5,
    marginTop: 15,
    marginLeft: 50,
    // width: 120,
    padding: 10,
    elevation: 2,
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