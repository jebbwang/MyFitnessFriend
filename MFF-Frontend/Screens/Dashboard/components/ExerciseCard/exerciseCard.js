
import React from 'react';
import { useState } from 'react';
import { ScrollView,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity} 
 from 'react-native';
 import Icon from 'react-native-vector-icons/MaterialIcons';

 import ExerciseList from '../../../Exercise/ExerciseList';
 import { WorkoutItem } from '../../../Exercise/ExerciseList';


import exerciseCardpng from '../../../../assets/exerciseCard.png';
import ExerciseListModal from '../../modals/ExerciseListModal';


const ExerciseCard = ({ items, handleAddItems, handleRemove, completedWorkouts, handleSetCompletedWorkouts, exerciseInfo, updateExerciseInfo }) => {
    return (
      <View style={styles.exerciseCard}>
        <Image source={exerciseCardpng} style={styles.exerciseCardImage}></Image>
        <ExerciseListModal items={items} exerciseInfo={exerciseInfo} updateExerciseInfo={updateExerciseInfo} handleAddItems={handleAddItems} handleRemove={handleRemove} completedWorkouts={completedWorkouts} handleSetCompletedWorkouts={handleSetCompletedWorkouts}/>
      </View>
    );
  };

export default ExerciseCard;

const styles = StyleSheet.create({
    exerciseCard: {
        backgroundColor: '#273646',
        borderRadius: 20,
        flexDirection: 'row',
        height: 70,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    exerciseCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    searchBar: {
        width: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 9,

      },
      searchInput: {
        flex: 1,
        marginLeft: 5,
        color: '#000',
      },
})