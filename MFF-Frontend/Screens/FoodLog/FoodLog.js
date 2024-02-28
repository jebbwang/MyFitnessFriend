import { useState } from 'react';
import React from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Text, StyleSheet, Pressable, Animated } from 'react-native';


function FoodLog() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Your Meals</Text>
      <Pressable
        style={({ pressed }) => [
          styles.createMeal,
          { backgroundColor: pressed ? '#5474A5' : '#78ADFC' }, 
        ]}
        onPress={() => console.log('Create meal pressed')}
      >
        {({ pressed }) => (
          <Text style={styles.createMealHeader}>
            {pressed ? 'Creating...' : 'Create Meal'} 
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1A2633",
    justifyContent: 'center',
  },
  header: {
    color: "#78ADFC",
    fontWeight: "bold",
    fontSize: 40,
  },
  createMeal: {
    backgroundColor: "#78ADFC",
    width: "40%",
    borderRadius: 30,
    padding: 20,
    marginTop: 15,
    alignItems: 'center', // Ensure text is centered
  },
  createMealHeader: {
    color: "#2B5B93",
    fontWeight: "bold",
    fontSize: 20,
  },
})

export default FoodLog;
