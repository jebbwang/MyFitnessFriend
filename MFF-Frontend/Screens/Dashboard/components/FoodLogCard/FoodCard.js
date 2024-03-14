
import React from 'react';
import { useState } from 'react';
import { ScrollView,
  View, Text, Image, Modal,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity} 
    from 'react-native';
import FoodPng from '../../../../assets/foodPng.png';
import FoodLogModal from './FoodLogModal';
const FoodCard = ({ onModalClose }) => {
    return (
      <View style={styles.exerciseCard}>
        <Image source={FoodPng} style={styles.exerciseCardImage}></Image>
        <FoodLogModal onModalClose={onModalClose}/>
      </View>
    );
  };

export default FoodCard;
const styles = StyleSheet.create({
    exerciseCard: {
        backgroundColor: '#273646',
        borderRadius: 20,
        flexDirection: 'row',
        height: 70,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    exerciseCardImage: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    searchBar: {
        width: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 9,

      },
      searchInput: {
        flex: 1,
        marginLeft: 5,
        color: '#000',
      },
})