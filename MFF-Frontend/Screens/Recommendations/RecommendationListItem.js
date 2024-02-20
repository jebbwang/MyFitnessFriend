import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListItem = ({ text, onToggleCheckbox, isChecked, onDelete }) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleCheckbox = () => {
    if (onToggleCheckbox === undefined){
      return
    }
    setChecked(!checked);
    onToggleCheckbox();
  };

  const backgroundColor = checked ? '#80CC91' : '#3E89E1';

  // Render the right actions for swipe
  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="delete-outline" size={30} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={toggleCheckbox} style={[styles.item, { backgroundColor }]}>
        <View style={styles.checkboxBase}>
          {checked && <View style={styles.checkboxChecked} />}
        </View>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    marginLeft: 10,
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
  },
  deleteButton: {
    // backgroundColor: '#3E89E1',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    borderColor: '#fff',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default ListItem;
