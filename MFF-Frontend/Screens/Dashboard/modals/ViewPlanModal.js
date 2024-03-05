
import React from 'react';
import {useState} from 'react';

import { ScrollView, Modal,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity, Pressable, Alert} 
 from 'react-native';

 import { SelectList } from 'react-native-dropdown-select-list'
 import { showMessage, hideMessage } from "react-native-flash-message";

//  import Modal from "react-native-modal";


import ViewPlan from '../../Exercise/ViewPlan';


const ViewPlanModal = ({ items, completedWorkouts, handleSetCompletedWorkouts }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleClose = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <View>
            <Modal
                visible={modalVisible}
                presentationStyle='pageSheet'
                animationType="slide"
                style={styles.modalContainer}
                statusBarTranslucent={true}
                >
                <View style={styles.centeredView}>
                    <ViewPlan handleClose={handleClose} newItems={items} completedWorkouts={completedWorkouts} handleSetCompletedWorkouts={handleSetCompletedWorkouts}/>
                </View> 
            </Modal>
            <TouchableOpacity
                style={[styles.viewPlanButton, styles.buttonClose]}
                onPress={() => setModalVisible(true)}>
                <Text style={[styles.viewPlanText]}>
                    View Current Plan
                </Text>
            </TouchableOpacity>
        </View>
    );
  };

export default ViewPlanModal;

// const WaterIntakeCard = ({ waterInfo, setWaterInfo, updateWaterIntake }) => {

//     return (
//     <>
//       <View style={styles.waterIntakeCard}>

//         <Image source={waterIntakepng} style={styles.waterIntakeCardImage}></Image>

//         <View style={styles.waterIntakeInfoContainer}>
//             <View style={styles.waterIntakeInfo}>
//                 <Text style={styles.waterIntakeInfoText}>Current</Text>
//                 <Text style={styles.waterIntakeInfoSubText}>{waterInfo.current} {waterInfo.currentType}</Text>
//             </View>
//             <View style={styles.waterIntakeInfo}>
//                 <Text style={styles.waterIntakeInfoText}>Daily Goal</Text>
//                 <Text style={styles.waterIntakeInfoSubText}>{waterInfo.dailyGoal} {waterInfo.dailyGoalType}</Text>
//             </View>
//             <View style={styles.waterIntakeInfo}>
//                 <AddModal waterInfo={waterInfo} setWaterInfo={setWaterInfo} updateWaterIntake={updateWaterIntake}/>
                
//             </View>

//         </View>
        
//       </View>
//     </>
//     );
//   };

// export default WaterIntakeCard;

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 22,
        backgroundColor: '#273646'
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
      viewPlanText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: "bold",
        padding: 5,
      },
      viewPlanButton: {
        backgroundColor: '#3E89E1',
        height: 40,
        width: 170,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        // marginTop: 25,
        alignSelf: 'center',
    
      },
})