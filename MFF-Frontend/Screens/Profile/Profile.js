import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useUserContext } from '../../components/UserContext/UserContext';
import { supabase } from '../../supabase';

const Profile = () => {
  const { userId } = useUserContext();

  const [userInfo, setUserInfo] = useState({
    firstName: 'Henry',
    lastName: 'Reyes',
    email: 'user1@gmail.com',
    weight: '145',
    height: '170',
    fitnessGoal: 'maintain',
    dateOfBirth: '1990-01-01', 
    weightType: 'lbs',
    heightType: 'cm',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('authUserID', userId)
        .single();

      if (data) {
        setUserInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          weight: data.weight.toString(),
          height: data.height.toString(),
          fitnessGoal: data.fitnessGoalType,
          dateOfBirth: data.dateOfBirth,
          weightType: data.weightType,
          heightType: data.heightType,
        });
      } else {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);


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
    // console.log(userId),
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
          <Text style={{ color: 'white', fontWeight: 'bold' }}>First Name</Text>
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Last Name</Text>
      </View>
      <View style={styles.row}>
        {renderInputField('firstName', 'First Name')}   
        {renderInputField('lastName', 'Last Name')}
      </View>
      <View style={styles.labelrow}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Email</Text>
      </View>
      <View style={styles.row}>
        {renderInputField('email', 'Email', 'email-address')}
      </View>
      <View style={styles.labelrow}>
        <View style={styles.label}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Weight ({userInfo.weightType})</Text>
        </View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Height ({userInfo.heightType})</Text>
      </View>
      <View style={styles.row}>
        {renderInputField('weight', 'Weight', 'numeric')}
        {renderInputField('height', 'Height', 'numeric')}
      </View>
      <View style={styles.labelrow}>
        <View style={styles.label}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Fitness Goal</Text>
        </View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>DOB</Text>
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
{/* 
      <TouchableOpacity style={styles.backHome} >
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity> */}
        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,

    backgroundColor: '#1A2633',
    justifyContent: 'center',

    marginTop : -20,
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
    fontWeight: 'bold'
  },
  infoContainer: {
    backgroundColor: "#293849",
    padding: 50,
    borderRadius: 20,
    height: 490,
    marginTop: 20,
    marginBottom: 60, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 20,
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
    backgroundColor: '#3E89E1',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,  
    shadowColor: 'rgba(0, 0, 0, 0.1)',  
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,  
    fontWeight: 'bold',  
  
  },
  backHome: {
    backgroundColor: '#3E89E1',  
    paddingVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,  
    shadowColor: 'rgba(0, 0, 0, 0.1)',  
    shadowOffset: { width: 0, height: 4 },
    width: 60,
    marginTop: 60,
  }
});

export default Profile;
