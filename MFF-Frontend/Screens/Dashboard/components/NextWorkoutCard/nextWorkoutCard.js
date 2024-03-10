
import React from 'react';

import { ScrollView,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity, Pressable, Alert} 
 from 'react-native';

//  import Modal from "react-native-modal"; // can maybe use this for the workout plan screen
import ViewPlanModal from '../../modals/ViewPlanModal';

const NextWorkoutCard = ({ items, handleAddItems, handleRemove, completedWorkouts, exerciseInfo, updateExerciseInfo }) => {

    return (
    <>
      <View style={styles.nextWorkoutCard}>


        <View style={styles.nextWorkoutContainer}>
            <View style={styles.nextWorkoutInfo}>
                <Text style={styles.nextWorkoutInfoText}>
                    Next Workout
                </Text>
                <Text style={styles.nextWorkoutInfoSubText}>
                    {/* {completedWorkouts && completedWorkouts.map((val, i) => (
                        val === 0 ? items.workout[i] : "None"
                    ))} */}
                    Random Workout
                </Text>
            </View>
            <View style={styles.button}>
                <ViewPlanModal items={items} exerciseInfo={exerciseInfo} updateExerciseInfo={updateExerciseInfo} handleAddItems={handleAddItems} completedWorkouts={completedWorkouts} handleSetCompletedWorkouts={handleSetCompletedWorkouts}/>
            </View>

        </View>
        
      </View>
    </>
    );
  };

export default NextWorkoutCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#273646',
        borderRadius: 20,
        height: 210,
        width: 175,
        padding: 20,
        alignItems: 'center',
    },

    nextWorkoutCard: {
        backgroundColor: '#273646',
        borderRadius: 20,
        height: 140,
        width: 200,
        padding: 10,
        marginBottom: 20,
    },
    nextWorkoutCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    nextWorkoutContainer: {
        width: 180,
        justifyContent: 'center',
    },
    nextWorkoutInfo: {
        marginHorizontal: 10
    },
    nextWorkoutInfoText: {
        marginTop: 5,
        color: 'white',
        fontSize: 23,
        fontWeight: '700'
    },
    nextWorkoutInfoSubText: {
        color: '#818e94',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 3,
    },
      button: {
        borderRadius: 20,
        marginTop: 10,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 80
      },

})