
import React from 'react';
import { ScrollView,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity} 
 from 'react-native';

import exerciseCardpng from '../../../../assets/exerciseCard.png';


const ExerciseCard = ({  }) => {
  
    return (
      <View style={styles.exerciseCard}>
        <Image source={exerciseCardpng} style={styles.exerciseCardImage}></Image>

        <View style={{width: 250, backgroundColor: '#596470', marginLeft: 15, height: 35, borderRadius: 20}}>

        </View>
      </View>
    );
  };

export default ExerciseCard;

const styles = StyleSheet.create({
    exerciseCard: {
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
    exerciseCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    }
})