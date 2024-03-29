
import React from 'react';
import {useState} from 'react';

import { ScrollView, Modal,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity, Pressable, Alert} 
 from 'react-native';
 import { KeyboardAvoidingView } from 'react-native';

//  import Modal from "react-native-modal";


 import { SelectList } from 'react-native-dropdown-select-list'
 import { showMessage, hideMessage } from "react-native-flash-message";
 import Icon from 'react-native-vector-icons/MaterialIcons';


//  import Modal from "react-native-modal";

import ExerciseList from '../../Exercise/ExerciseList';


const ExerciseListModal = ({ items, exerciseInfo, updateExerciseInfo, handleAddItems, handleRemove, completedWorkouts, handleSetCompletedWorkouts }) => {
    // UseStates
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('')


    // Handlers
    const handleUserInputChange = (text) => {
        setInputValue(text);
      };

    const handleSearch = (val) => {
        // setInputValue(val);
        setModalVisible(!modalVisible)

    };

    const handleClose = () => {
        setModalVisible(!modalVisible)
    }



    return (
        <View>
            <Modal
                visible={modalVisible}
                presentationStyle='fullScreen'
                animationType="slide"
                style={styles.modalContainer}
                statusBarTranslucent={true}
                >
                <View style={styles.centeredView}>
                    <ExerciseList handleClose={handleClose} items={items} exerciseInfo={exerciseInfo} updateExerciseInfo={updateExerciseInfo} handleAddItems={handleAddItems} handleRemove={handleRemove} completedWorkouts={completedWorkouts} handleSetCompletedWorkouts={handleSetCompletedWorkouts}/>
                </View> 
            </Modal>
            <View style={{width: 240, backgroundColor: '#26A341', marginLeft: 20, height: 40, borderRadius: 20}}>
            <TouchableOpacity onPress={(val) => handleSearch(val)} >

                <View style={styles.searchBar}>
                    {/* <Icon name="search" size={25} color="white" /> */}
                    <Text style={styles.searchInput}>Explore Workouts</Text>
                    {/* <Text
                       
                    /> */}
                </View>
                </TouchableOpacity>
            </View>
        </View>
    );
  };

export default ExerciseListModal;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#273646',
        borderRadius: 20,
        height: 210,
        width: 350,
        padding: 20,
        alignItems: 'center',
    },
    modalContainer: {
        color: '#273646'
    },
    input: {
        fontSize: 15,
        alignSelf: 'flex-start',
        height: 50,
        width: 120,
        borderColor: 'white',
        borderWidth: 2,
        padding: 10,
        borderRadius: 12,
        color: "white",
      },
    dropdownComponent: {
        marginTop: 5
    },
    dropdown: {
        marginTop: 5,
        marginLeft: 5,
        backgroundColor: '#273646',
        alignSelf: 'flex-start',
        height: 45,
        width: 170,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        color: "white",
        alignItems: 'center'

    },
    dropdownText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700'
    },
    waterIntakeCard: {
        backgroundColor: '#273646',
        borderRadius: 20,
        flexDirection: 'row',
        height: 70,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    waterIntakeCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    waterIntakeInfoContainer: {
        flexDirection: 'row',
        width: 280,
        justifyContent: 'center',
        alignItems: 'center'
    },
    waterIntakeInfo: {
        marginHorizontal: 10
    },
    waterIntakeInfoText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '700'
    },
    waterIntakeInfoSubText: {
        color: '#c4c4c4',
        fontSize: 13,
        fontWeight: '600'
    },

    centeredView: {
        // width: 00,
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
      },
      modalView: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        borderRadius: 20,
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
        width: 60
      },
      modalText: {
        color: 'white',
        fontSize: 30,
        fontWeight: "800",
        marginBottom: 15,
        alignSelf: 'flex-start',
      },
      searchBar: {
        // width: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 10,
        // padding: 12,

      },
      searchInput: {
        flex: 1,
        // marginLeft: 5,
        color: 'white',
        textAlign: 'center',
        // marginTop: 7,
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 17,
        fontWeight: "bold"
      },
      
})