import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FoodLog from '../../../FoodLog/FoodLog'; // Import the FoodLog component

const FoodLogModal = ({ /* props if any */ }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpen = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false} 
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View>
            <FoodLog handleClose={handleClose} />
        </View>
      </Modal>
      <View style={{width: 240, backgroundColor: '#F1C21B', marginLeft: 20, height: 40, borderRadius: 20}}>
        <TouchableOpacity onPress={handleOpen}>
            <View style={styles.searchBar}>
                <Text style={styles.searchInput}>Track Meals</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
     
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchBar: {
        // width: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 10,

      },
      searchInput: {
      
        // marginLeft: 5,
        color: 'white',
        fontSize: 17,
        fontWeight: "bold"
      },
});

export default FoodLogModal;