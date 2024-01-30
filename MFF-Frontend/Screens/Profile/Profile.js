import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'Test',
    lastName: 'User',
    email: 'user1@gmail.com',
    weight: '145', 
    height: '170', 
    fitnessGoal: 'maintain', 
    dateOfBirth: '1990-01-01', 
  });

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (name, value) => {
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <View style={styles.container}>
      {Object.keys(userInfo).map((key) => (
        <TextInput
          key={key}
          value={userInfo[key]}
          onChangeText={(value) => handleInputChange(key, value)}
          style={[styles.input, !isEditable && styles.inputDisabled]}
          editable={isEditable}
          selectTextOnFocus={isEditable}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
        <Text style={styles.buttonText}>{isEditable ? 'Save Changes' : 'Edit Information'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: 'gray',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default Profile;
