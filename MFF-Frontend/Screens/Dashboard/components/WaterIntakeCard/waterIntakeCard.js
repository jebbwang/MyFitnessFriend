
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


const AddModal = ({ waterInfo, setWaterInfo, updateWaterIntake }) => {
    // UseStates
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const [selectedWaterUnit, setSelectedWaterUnit] = React.useState("");
    const [waterGoalAchieved, setWaterGoalAchieved] = useState(false)
    const ozInGallon = 128

    // Handlers
    const handleUserInputChange = (text) => {
        setInputValue(text);
      };

    const handleAddButtonClick = () => {
        setModalVisible(!modalVisible)

        const numericValueInput = parseInt(inputValue, 10);
        const waterCurrValue = parseInt(waterInfo.current, 10);
        let newWaterIntake = 0;

        // TODO: idea here is to convert every inputValue into the equivalent amount in OUNCES (regardless of what unit the user chose)
        if (selectedWaterUnit == 'Cup(s)') {
            newWaterIntake = (numericValueInput * 8); // 8 oz per cup
        }
        else if (selectedWaterUnit == 'Liter(s)') {
            newWaterIntake = (numericValueInput * 33.814); // 33.814 oz per liter
        }
        else if (selectedWaterUnit == 'Gallon(s)') {
            newWaterIntake = (numericValueInput * 128); // 33.814 oz per liter
        }
        else {
            newWaterIntake = numericValueInput; // default to ounces
        }

        // removed this for now, will figure out how to make it work with current implementation later
        
        // if ((newWaterIntake >= waterInfo.dailyGoal * ozInGallon) && !(waterGoalAchieved)) {
        //     setWaterGoalAchieved(true)
        //     showMessage({
        //     message: "Congrats! You achieved your daily water intake!",
        //     type: "success",
        //   });
        // }

        updateWaterIntake(newWaterIntake);
    };

  
    const waterInfoTypeOptions = [
        {key:'1', value:'Ounce(s)'},
        {key:'2', value:'Cup(s)'},
        {key:'3', value:'Liter(s)'},
        {key:'4', value:'Gallon(s)'},
    ]


    return (
        <View>
            <Modal
                isVisible={modalVisible}
                // presentationStyle='pageSheet'
                onBackdropPress={() => setModalVisible(false)}
                style={styles.modalContainer}
                >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.card}>
                        <Text style={styles.modalText}>Log Water Intake</Text>

                        <View style={{flexDirection: 'row', alignSelf: 'flex-start', width: 220, zIndex: 1}}>
                            <TextInput
                                // ref={waterIntake}
                                placeholder={'Enter amount'}
                                // placeholderTextColor={"white"}
                                keyboardType="numeric"
                                // value={0}
                                onChangeText={handleUserInputChange}
                                style={styles.input}
                                // onFocus={() => setFocusedField(fieldName)}
                                // onBlur={() => setFocusedField(null)}
                            />
                            <SelectList 
                                setSelected={(val) => setSelectedWaterUnit(val)} 
                                data={waterInfoTypeOptions} 
                                save="value"
                                style={styles.dropdownComponent}
                                boxStyles={styles.dropdown}
                                inputStyles={styles.dropdownText}
                                dropdownStyles={{backgroundColor: '#273646', borderWidth: 2}}
                                dropdownTextStyles={styles.dropdownText}
                            />
                        </View>

                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute', bottom: 20, right: 20}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose, {marginRight: 5, backgroundColor: '#90999e'}]}
                                onPress={() => setModalVisible(!modalVisible)}>
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
            <TouchableOpacity
                // style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Image source={addIcon} style={{width: 25, height: 25, marginLeft: 10}} />

            </TouchableOpacity>
        </View>
    //   <TouchableOpacity onPress={onPress} >
    //     <Image source={addIcon} style={{width: 25, height: 25, marginLeft: 10}} />
    //   </TouchableOpacity>
    );
  };


const WaterIntakeCard = ({ waterInfo, setWaterInfo, updateWaterIntake }) => {

    return (
    <>
      <View style={styles.waterIntakeCard}>

        <Image source={waterIntakepng} style={styles.waterIntakeCardImage}></Image>

        <View style={styles.waterIntakeInfoContainer}>
            <View style={styles.waterIntakeInfo}>
                <Text style={styles.waterIntakeInfoText}>Current</Text>
                <Text style={styles.waterIntakeInfoSubText}>{waterInfo.current} {waterInfo.currentType}</Text>
            </View>
            <View style={styles.waterIntakeInfo}>
                <Text style={styles.waterIntakeInfoText}>Daily Goal</Text>
                <Text style={styles.waterIntakeInfoSubText}>{waterInfo.dailyGoal} {waterInfo.dailyGoalType}</Text>
            </View>
            <View style={styles.waterIntakeInfo}>
                <AddModal waterInfo={waterInfo} setWaterInfo={setWaterInfo} updateWaterIntake={updateWaterIntake}/>
                
            </View>

        </View>
        
      </View>
    </>
    );
  };

export default WaterIntakeCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#273646',
        borderRadius: 20,
        
        // borderWidth: 2,
        // borderColor: 'white',
        height: 210,
        width: 350,
        padding: 20,
        // marginBottom: 1,
        // marginTop: 40,
        alignItems: 'center',
    },
    modalContainer: {
        color: '#273646'
    },
    input: {
        fontSize: 15,
        // backgroundColor: '#83949e',

        // fontWeight: '700',
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
        // fontSize: 15,
        alignSelf: 'flex-start',
        height: 45,
        width: 170,
        borderColor: 'white',
        borderWidth: 2,
        // padding:,
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
        
        // borderWidth: 2,
        // borderColor: 'white',
        height: 70,
        padding: 10,
        marginBottom: 20,
        // marginTop: 40,
        alignItems: 'center',
    },
    waterIntakeCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    waterIntakeInfoContainer: {
        flexDirection: 'row',
        // marginLeft: 10,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        // margin: 20,
        // backgroundColor: '#1A2633',
        // opacity: '0.7',
        borderRadius: 20,
        // padding: 100,
        // width: 10000,
        // height: 10000,
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 0,
        // },
        // shadowOpacity: 2,
        // shadowRadius: 100,
        // elevation: 10,
      },
      button: {
        borderRadius: 20,
        // marginHorizontal: 5,
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