import React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView,FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';

import ListItem from '../Recommendations/RecommendationListItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function ViewPlan() {
  // testing data
  const [items, setItems] = useState([
    {
      id: '1',
      date: 'February 11, 2024',
      workout: ['Strength #1', 'Strength #2', 'Cardio #1', 'Strength #3'],
      completed: [1, 0, 0, 1]
    },
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
        return { ...item, completed: newCompleted };
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
          {workouts.map((workout, exerciseIndex) => (
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
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#07203A',
  },
  scrollView: {
    margin: 10,
  },
  header: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 20,
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
});

export default ViewPlan;
