
import React from 'react';

import { ScrollView,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity, Pressable, Alert} 
 from 'react-native';

//  import Modal from "react-native-modal"; // can maybe use this for the workout plan screen

const NextWorkoutCard = ({  }) => {

    return (
    <>
      <View style={styles.nextWorkoutCard}>


        <View style={styles.nextWorkoutContainer}>
            <View style={styles.nextWorkoutInfo}>
                <Text style={styles.nextWorkoutInfoText}>Next Workout</Text>
                <Text style={styles.nextWorkoutInfoSubText}>Random Workout</Text>
            </View>
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => null}>
                <Text style={[styles.textStyle]}>
                    View Plan
                </Text>
            </TouchableOpacity>

        </View>
        
      </View>
    </>
    );
  };

export default NextWorkoutCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#273646',
        borderRadius: 20,
        
        // borderWidth: 2,
        // borderColor: 'white',
        height: 210,
        width: 175,
        padding: 20,
        // marginBottom: 1,
        // marginTop: 40,
        alignItems: 'center',
    },

    nextWorkoutCard: {
        backgroundColor: '#273646',
        borderRadius: 20,
        // flexDirection: 'row',
        
        // borderWidth: 2,
        // borderColor: 'white',
        height: 130,
        width: 180,
        padding: 10,
        marginBottom: 20,
        // marginTop: 40,
        alignItems: 'center',
    },
    nextWorkoutCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    nextWorkoutContainer: {
        // flexDirection: 'row',
        // marginLeft: 10,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextWorkoutInfo: {
        marginHorizontal: 10
    },
    nextWorkoutInfoText: {
        // width: 170,
        // marginLeft: 40,
        marginTop: 5,
        color: 'white',
        fontSize: 23,
        fontWeight: '700'
    },
    nextWorkoutInfoSubText: {
        color: '#818e94',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 3,
    },
      button: {
        borderRadius: 20,
        // marginHorizontal: 5,
        marginTop: 15,
        marginLeft: 50,
        // width: 120,
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
        width: 80
      },

})