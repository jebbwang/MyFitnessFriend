
import React from 'react';
import { ScrollView,
  View, Text, Image,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity} 
 from 'react-native';

import exerciseCardpng from '../../../../assets/exerciseCard.png';


const LogCard = ({  }) => {
  
    return (
      <View style={styles.logCard}>
        <Image source={exerciseCardpng} style={styles.exerciseCardImage}></Image>

        <View style={styles.logContainer}>
            <Text style={styles.logHeader}>Log Food</Text>
        </View>
      </View>
    );
  };

export default LogCard;

const styles = StyleSheet.create({
    logCard: {
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

    logContainer: {
        width: 250, backgroundColor: '#596470', marginLeft: 15, height: 35, borderRadius: 20,
        flex: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    logHeader: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    exerciseCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    }
})