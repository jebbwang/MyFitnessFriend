import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'Henry',
    lastName: 'Reyes',
    email: 'user1@gmail.com',
    weight: '145',
    height: '170',
    fitnessGoal: 'maintain',
    dateOfBirth: '1990-01-01', 
  });


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

  const focusField = (fieldName) => {
    inputRefs[fieldName].current.focus();
  };

  const renderInputField = (fieldName, placeholder) => {
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
      <View style={styles.header} >
        <Text style={styles.header}>Fitness Profile Settings</Text>

      </View>
      <View style={styles.subheader} >
        <Text style={styles.subheader}>Tap on a field to edit information</Text>

      </View>
      <View style={styles.infoContainer} >
      <View style={styles.labelrow}>
        <View style={styles.label}>
          <Text>First Name </Text>
        </View>
        <Text> Last Name</Text>
      </View>
      <View style={styles.row}>
        {renderInputField('firstName', 'First Name')}   
        {renderInputField('lastName', 'Last Name')}
      </View>
      <View style={styles.labelrow}>
        <Text>Email</Text>
      </View>
      <View style={styles.row}>
        {renderInputField('email', 'Email', 'email-address')}
      </View>
      <View style={styles.labelrow}>
        <View style={styles.label}>
          <Text>Weight         </Text>
        </View>
        <Text>Height</Text>
      </View>
      <View style={styles.row}>
        {renderInputField('weight', 'Weight', 'numeric')}
        {renderInputField('height', 'Height', 'numeric')}
      </View>
      <View style={styles.labelrow}>
        <View style={styles.label}>
          <Text>Fitness Goal</Text>
        </View>
        <Text>DOB</Text>
      </View>
      <View style={styles.row}>
        {renderInputField('fitnessGoal', 'Fitness Goal')}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Date of Birth"
            value={userInfo.dateOfBirth}
            style={styles.input}
            editable={false} 
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backHome} >
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>
        
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
  header: {
    color: "white",
    fontSize: 28,
    fontWeight: 'bold',
  },
  subheader: {
    color: "rgba(120, 173, 252, 1)",
    marginBottom: 8,
    marginTop: 4,
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: "rgba(120, 173, 252, 1)",
    padding: 50,
    borderRadius: 20,
    height: 500,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 5,
  },
  labelrow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    color: "white",
    marginRight: 70,
    fontWeight: "bold"
  },
  inputWrapper: {
    flex: 1, 
    marginRight: 15, 
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
    backgroundColor: '#e0e0e0', 
    color: "black",
  },
  button: {
    backgroundColor: '#014EAA',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,  
    shadowColor: 'rgba(0, 0, 0, 0.1)',  
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center"
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,  
    fontWeight: 'bold',  
  
  },
  backHome: {
    backgroundColor: '#014EAA',  
    paddingVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,  
    shadowColor: 'rgba(0, 0, 0, 0.1)',  
    shadowOffset: { width: 0, height: 4 },
    width: 60,
    marginTop: 90,
  }
});

export default Profile;
