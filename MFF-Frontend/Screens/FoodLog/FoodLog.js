import React, { useState } from 'react';
import { Alert, Modal, View, Text, TextInput, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native';

function FoodLog() {
  const [modalVisible, setModalVisible] = useState(false);
  const [mealName, setMealName] = useState('');
  const [mealDetails, setMealDetails] = useState(['']); 
  // meals is an array of {mealName, mealDetails} objects
  const [meals, setMeals] = useState([]); 

  const addMealDetail = () => {
    setMealDetails([...mealDetails, '']);
  };

  const updateMealDetail = (index, value) => {
    const updatedDetails = [...mealDetails];
    updatedDetails[index] = value;
    setMealDetails(updatedDetails);
  };

  const removeMealDetail = (index) => {
    const updatedDetails = mealDetails.filter((_, detailIndex) => detailIndex !== index);
    setMealDetails(updatedDetails);
  };

  const finalizeMeal = () => {
    if (!mealName.trim() || mealDetails.every(detail => !detail.trim())) {
      Alert.alert(
        "Invalid Meal",
        "Please make sure the meal has a name and at least one ingredient."
      );
    } else {
      setMeals([...meals, { mealName, mealDetails: mealDetails.filter(detail => detail.trim()) }]);
      setMealName('');
      setMealDetails(['']);
      setModalVisible(!modalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Your Meals</Text>
      <Pressable
        style={({ pressed }) => [
          styles.createMeal,
          { backgroundColor: pressed ? '#5474A5' : '#78ADFC' },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createMealHeader}>Create Meal</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView} contentContainerStyle={styles.scrollViewContent}>
          {/* "X" button to close the modal */}
          <Pressable 
              style={styles.closeButton} 
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
            <Text style={styles.modalHeader}>Meal Name</Text>
            <TextInput
              style={[styles.input, styles.inputRound]}
              onChangeText={setMealName}
              value={mealName}
              placeholder="Meal Name"
            />
            <Text style={styles.modalHeader}>Meal ingredients</Text>
            {mealDetails.map((detail, index) => (
              <View key={index} style={styles.detailInputContainer}>
                {/* remove button */}
                <Pressable onPress={() => removeMealDetail(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>-</Text>
                </Pressable>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => updateMealDetail(index, text)}
                  value={detail}
                  placeholder="Meal Detail (e.g., Ingredient)"
                />
                {/* add button only aplies to most recent ingredient */}
                {index === mealDetails.length - 1 && (
                  <Pressable onPress={addMealDetail} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </Pressable>
                )}
              </View>
            ))}

            {/* user is done with creating meal */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={finalizeMeal}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
      {/* Displaying all meals */}
      <FlatList
        data={meals}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text style={styles.mealName}>{item.mealName}</Text>
            <View style={styles.mealDetailContainer}>
              {item.mealDetails.map((detail, index) => (
                <Text key={index} style={styles.mealDetail}>{detail}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1A2633",
    justifyContent: 'center',
    flex: 1,
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
    alignItems: 'center',
  },
  createMealHeader: {
    color: "#2B5B93",
    fontWeight: "bold",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor:"#78ADFC",
    maxHeight: '80%',
    width: '100%',
  },
  scrollViewContent: {
    alignItems: "center", 
    flexGrow: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    color: "white"
  },
  inputRound: {
    borderRadius: 20,
    width: '90%',
    paddingVertical: 8,
  },
  detailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '75%',
    color: "white",
  },
  addButton: {
    marginLeft: 30,
    backgroundColor: '#5DB06F',
    borderRadius: 20,
    padding: 10,
    width: 60,
    flex: "row",
    alignItems: "center"
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  removeButton: {
    marginRight: 30,
    backgroundColor: '#D9534F',
    borderRadius: 20,
    padding: 10,
    width: 60,
    flex: "row",
    alignItems: "center"
  },
  removeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mealItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E8E8E8', 
    borderRadius: 10,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mealName: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealDetailContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  mealDetail: {
    color: '#555',
    fontSize: 16,
  },
  modalHeader: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  }, 
  closeButton: {
    position: 'absolute',  
    left: -20,
    top: -20,
    backgroundColor: "#1A2633",
    width: 30,
    height: 30,
    borderRadius: 15,  
    justifyContent: 'center',  
    alignItems: 'center', 
    zIndex: 10, 
  },
  closeButtonText: {
    color: "#78ADFC",
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default FoodLog;