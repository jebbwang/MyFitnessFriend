import React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView,FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

import ListItem from '../Recommendations/RecommendationListItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ViewPlan = ({ handleClose, newItems, handleAddItems, 
  // completedWorkouts, handleSetCompletedWorkouts 
}) => {
  const [completedWorkouts, setCompletedWorkouts] = useState(new Array(newItems.length).fill(0))

  // testing data
  const [items, setItems] = useState([
    {
      id: '1',
      date: 'Today', 
      workout: newItems,
      completed: completedWorkouts
    }, 
    // The rest of the items in this array are fake 'previous days' for testing purposes  
    {
      id: '2',
      date: 'February 10, 2024',
      workout: ['Cardio #1', 'Strength #1', 'Cardio #2', 'Strength #2'],
      completed: [1, 0, 0, 0]
    },
    {
      id: '3', 
      date: 'February 9, 2024',
      workout: ['Cardio #1', 'Strength #1', 'Cardio #2', 'Strength #2'],
      completed: [1, 1, 1, 0]
    },
    {
      id: '4',
      date: 'February 8, 2024',
      workout: ['Cardio #1', 'Strength #1'],
      completed: [1, 1]
    },
  ]);

  const handleDelete = (id, workoutIndex) => {
    setItems(items.map((item, index) => {

      // index === 0, checking to see if the 
      // workoutPlan is for today's 

      // the only plan that is editable is today's (the current)
      if (item.id === id && index === 0) {
        let newWorkouts = [...item.workout];
        let newCompleted = [...item.completed];
        
        // remove exercise from list
        newWorkouts.splice(workoutIndex, 1);
        newCompleted.splice(workoutIndex, 1);
        return { ...item, workout: newWorkouts, completed: newCompleted };
      }
      return item;
    }));
  };
  

  const handleToggleCheckbox = (id, workoutIndex) => {
    setItems(items.map((item, index) => {
      // the only plan that is editable is today's (the current, index that is 0)
      if (item.id === id && index === 0) { 
        let newCompleted = [...item.completed];
        newCompleted[workoutIndex] = newCompleted[workoutIndex] === 0 ? 1 : 0;
        let updated = { ...item, completed: newCompleted }
        setCompletedWorkouts(updated)
        handleSetCompletedWorkouts(completedWorkouts)
        console.log(completedWorkouts)
        return updated;
      }
      return item;
    }));
  };
  

  // WorkoutByDate is the component that holds ListItems, each 
  // exercise is a ListItem
  const WorkoutByDate = ({ id, date, workouts, completed, onToggleCheckbox, onDelete, isCollapsible, isEditable }) => {
    const [isCollapsed, setIsCollapsed] = useState(isCollapsible);
  
    return (
      <View style={{ marginBottom: 20 }}>
        <Pressable onPress={() => isCollapsible && setIsCollapsed(!isCollapsed)}>
          <View style={styles.date}>
            <Text style={styles.dateHeader}>{date}</Text>
          </View>
        </Pressable>
        <Collapsible collapsed={isCollapsed}>
          {workouts && workouts.map((workout, exerciseIndex) => (
            <ListItem
              key={exerciseIndex}
              text={workout}
              isChecked={completed[exerciseIndex] === 1}
              onToggleCheckbox={isEditable ? () => onToggleCheckbox(id, exerciseIndex) : undefined}
              onDelete={isEditable ? () => onDelete(id, exerciseIndex) : undefined}
            />
          ))}
        </Collapsible>
       
      </View>
    );
  };
  

  const renderItem = ({ item, index }) => (
    <WorkoutByDate
      id={item.id}
      date={item.date}
      workouts={item.workout}
      completed={item.completed}
      onToggleCheckbox={handleToggleCheckbox}
      onDelete={handleDelete}
      isCollapsible={index > 0}
      isEditable={index === 0} 
    />
  );
  
  const ItemSeparator = () => <View style={{ height: 10 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1, margin: 10 }}>
        <Text style={styles.header}>Workout Plan</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
        />
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.viewPlanText }>Close</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1A2633',
    width: 400,
    // padding: 200
    // marginTop: 20,
    // height: 800,
  },
  scrollView: {
    margin: 10,
  },
  header: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "800",
    marginLeft: 10,
    marginBottom: 20,
    // marginVertical: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  planContainer: {
    backgroundColor: "#435D7C",
    padding: 15,
    margin: 10,
    borderRadius: 20,

  },
  date: {
    marginBottom: 10,
    backgroundColor: "#435D7C",
    padding: 10,
    borderRadius: 20,
    width: "",
    alignItems: "center"
  },
  dateHeader: {
    color: "#fff",
    fontWeight: "bold"
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#475E78', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  bulletPoints: {
    width: 10,
    height: 10,
    backgroundColor: '#fff', 
    borderRadius: 5,
    marginRight: 10,
  },
  workoutText: {
    fontSize: 16,
    color: '#fff', 
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
  viewPlanText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
  },
});

export default ViewPlan;
