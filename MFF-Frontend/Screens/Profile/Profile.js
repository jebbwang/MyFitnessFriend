import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'Test',
    lastName: 'User',
    email: 'user1@gmail.com',
    weight: '145',
    height: '170',
    fitnessGoal: 'maintain',
    dateOfBirth: '1990-01-01', // This field will be display-only
  });

  // Create a ref for each TextInput
  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    weight: useRef(null),
    height: useRef(null),
    fitnessGoal: useRef(null),
  };


  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (name, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to focus the TextInput when its TouchableOpacity is pressed
  const focusField = (fieldName) => {
    inputRefs[fieldName].current.focus();
  };

  const renderInputField = (fieldName, placeholder, keyboardType = 'default') => {
    return (
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => focusField(fieldName)}

      >
        <TextInput
          ref={inputRefs[fieldName]}
          placeholder={placeholder}
          value={userInfo[fieldName]}
          onChangeText={(value) => handleInputChange(fieldName, value)}
          style={[styles.input, focusedField === fieldName && styles.inputFocused]}
          onFocus={() => setFocusedField(fieldName)}
          onBlur={() => setFocusedField(null)}

          />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer} >
      <View style={styles.row}>
        {renderInputField('firstName', 'First Name')}
        {renderInputField('lastName', 'Last Name')}
      </View>
      <View style={styles.row}>
        {renderInputField('email', 'Email', 'email-address')}
      </View>
      <View style={styles.row}>
        {renderInputField('weight', 'Weight', 'numeric')}
        {renderInputField('height', 'Height', 'numeric')}
      </View>
      <View style={styles.row}>
        {renderInputField('fitnessGoal', 'Fitness Goal')}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Date of Birth"
            value={userInfo.dateOfBirth}
            style={styles.input}
            editable={false} // This field is not editable
          />
        </View>
      </View>
        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#014EAA',
    justifyContent: 'center',
  },
  infoContainer: {
    backgroundColor: "rgba(120, 173, 252, 1)",
    padding: 50,
    borderRadius: 20,
    height: 500,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 5,
  },
  input: {
    height: 40,
    borderColor: '#014EAA',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    color: "white",
  },
  inputFocused: {
    backgroundColor: '#e0e0e0', // background color when input is focused
    color: "black",
  },
});

export default Profile;
