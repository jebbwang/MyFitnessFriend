import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

function FoodLog() {
  const [modalVisible, setModalVisible] = useState(false);
  const [mealName, setMealName] = useState('');
  const [mealDetails, setMealDetails] = useState(['']); 

  const addMealDetail = () => {
    setMealDetails([...mealDetails, '']); 
  };


  const updateMealDetail = (index, value) => {
    const updatedDetails = [...mealDetails];
    updatedDetails[index] = value;
    setMealDetails(updatedDetails);
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
          <ScrollView style={styles.modalView} >
            <TextInput
              style={[styles.input, styles.inputRound]}
              onChangeText={setMealName}
              value={mealName}
              placeholder="Meal Name"
            />
            {mealDetails.map((detail, index) => (
              <View key={index} style={styles.detailInputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => updateMealDetail(index, text)}
                  value={detail}
                  placeholder="Meal Detail (e.g., Ingredient)"
                />
                {index === mealDetails.length - 1 && (
                  <Pressable onPress={addMealDetail} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </Pressable>
                )}
              </View>
            ))}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: "#1A2633",
    maxHeight: '80%',
    width: '90%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  inputRound: {
    borderRadius: 20,
    width: '90%',
    paddingVertical: 8,
  },
  detailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
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
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default FoodLog;
