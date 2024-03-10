
import React from 'react';
import {useState} from 'react';

import { ScrollView,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity, Pressable, Alert} 
 from 'react-native';

 import { SelectList } from 'react-native-dropdown-select-list'
 import { showMessage, hideMessage } from "react-native-flash-message";

 import Modal from "react-native-modal";

import waterIntakepng from '../../../../assets/waterIntakeLogo.png';
import addIcon from '../../../../assets/addIcon.png';


const AddModal = ({ exerciseInfo, updateExerciseInfo, modalVisible, updateModalVisible }) => {
    // UseStates
    // const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('')
    // const [selectedWaterUnit, setSelectedWaterUnit] = React.useState("");
    const [exerciseGoalAchieved, setExerciseGoalAchieved] = useState(false)
    const minInHour = 60


    // Handlers
    const handleUserInputChange = (text) => {
        setInputValue(text);
      };

    const handleAddButtonClick = () => {
        updateModalVisible(!modalVisible)

        const numericValueInput = parseInt(inputValue, 10);
        const exerciseCurrValue = parseInt(exerciseInfo.current, 10);
        let newExerciseTime = exerciseCurrValue + numericValueInput;

        if ((newExerciseTime >= exerciseInfo.dailyGoal * minInHour) && !(exerciseGoalAchieved)) {
            setExerciseGoalAchieved(true)
            showMessage({
            message: "Congrats! You achieved your daily exercise goal!",
            type: "success",
          });
        }
    

        updateExerciseInfo(newExerciseTime);
    };

  
    


    return (
        <View>
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setExerciseModalVisible(false)}
                style={styles.modalContainer}
                >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.card}>
                        <Text style={styles.modalText}>Log Exercise Time</Text>

                        <View style={{alignSelf: 'flex-start', width: 220, zIndex: 1}}>
                            <TextInput
                                placeholder={'Enter amount (min)'}
                                keyboardType="numeric"
                                onChangeText={handleUserInputChange}
                                style={styles.input}
                            />
                           
                        </View>

                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute', bottom: 20, right: 20}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose, {marginRight: 5, backgroundColor: '#90999e'}]}
                                onPress={() => updateModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleAddButtonClick}>
                                <Text style={[styles.textStyle]}>
                                    Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                </View>
            </Modal>
        </View>
    );
  };


const ExerciseTimeCard = ({ exerciseInfo, updateExerciseInfo, modalVisible, updateModalVisible  }) => {

    return (
    <>
        <AddModal exerciseInfo={exerciseInfo} updateExerciseInfo={updateExerciseInfo} modalVisible={modalVisible} updateModalVisible={updateModalVisible}/>
    </>
    );
  };

export default ExerciseTimeCard;

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
        width: 220,
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
    intakeCard: {
        backgroundColor: '#273646',
        borderRadius: 20,
        flexDirection: 'row',
        height: 70,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    intakeCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    intakeInfoContainer: {
        flexDirection: 'row',
        width: 280,
        justifyContent: 'center',
        alignItems: 'center'
    },
    intakeInfo: {
        marginHorizontal: 10
    },
    intakeInfoText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '700'
    },
    intakeInfoSubText: {
        color: '#c4c4c4',
        fontSize: 13,
        fontWeight: '600'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
})