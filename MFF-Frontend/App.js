import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

import Ionicons from '@expo/vector-icons/Ionicons';


import { UserProvider } from './components/UserContext/UserContext';
import FlashMessage from "react-native-flash-message";


import SignInScreen from './CreateAccount/SignInScreen';
import Questionaire from './CreateAccount/Questionaire'; 
import WelcomePage from './CreateAccount/WelcomePage';
import ExerciseFrequencyQuestion from './CreateAccount/ExerciseFrequency';
import Dashboard from './Screens/Dashboard/Dashboard';
import HoursSleep from './CreateAccount/HoursSleep';
import FitnessGoal from './CreateAccount/FitnessGoal';
import EndScreen from './CreateAccount/EndScreen';
import Home from './Screens/Profile/Profile';
import Profile from './Screens/Profile/Profile';
import Recommendations from './Screens/Recommendations/RecommendationsPage';

import CreateAccount from './CreateAccount/CreateAccount';


import ExerciseList from './Screens/Exercise/ExerciseList';
import ViewPlan from './Screens/Exercise/ViewPlan';


const Stack = createStackNavigator();

function LandingPage({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('./assets/Inter/static/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/Inter/static/Inter-Bold.ttf'),
  });

  return (
    <View style={styles.container}>
      <Image source={require('./assets/figureBig.png')} style={styles.logo} />
      <Text style={styles.title}>MyFitnessFriend</Text>
      
      {/* sign in screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exercise')}>
        <Text style={styles.buttonText}>Exercise</Text>
      </TouchableOpacity>
      
      <Text style={styles.noAcc}>Don't have an account? Get started!</Text>
      
      {/* create account screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [userCompletedInitialPages, setUserCompletedInitialPages] = useState(false);

  const handleUserCompletion = () => {
    // Logic to determine whether the user has completed the initial pages
    setUserCompletedInitialPages(true);
  };

  return (
    /*
    User Provider allows all of the following pages to access useState variables listed here in
    App.js. 
    
    This is used for EndScreen.js in the following way:

      - It requires the 'userCompletedInitialPages' variable to keep track of when the user 
        completed the initial questionarre/setup. Upon completing it, the user is redirected 
        to main dashboard.

    This may not be necessary (app still functions without it), though future issues may come up
    in terms of storing/fetching user questionarre data. Need to ensure all the data the user inputs
    from the questionarre is uploaded to backend database after clicking 'Next' on every page.
      - Upon 'Next' button click, it fires a POST request to the server to store data in database.
        (ensures no potential data loss)
      
    */
    <UserProvider>
      {/* Nav stack below */}
    <NavigationContainer> 
      {!userCompletedInitialPages ? (
        <Stack.Navigator 
            initialRouteName="Landing"
            screenOptions={{
              headerStyle: { backgroundColor: '#1A2633', shadowColor: 'transparent'},

              // REMOVING SCREEN TITLE ON TOP 

              headerTitle: ' ',
              headerTintColor: 'white'}}
          >
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          {/* <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            initialParams={{ setUserCompletedInitialPages }}
          /> */}
          <Stack.Screen name="SignIn" component={SignInScreen} initialParams={{ handleUserCompletion }}/> 
          <Stack.Screen name="Welcome" component={WelcomePage} /> 
          <Stack.Screen name="Questionaire1" component={Questionaire} />
          <Stack.Screen name="ExerciseFrequency" component={ExerciseFrequencyQuestion} />
          <Stack.Screen name="HoursOfSleep" component={HoursSleep} />
          <Stack.Screen name="FitnessGoal" component={FitnessGoal} />
          <Stack.Screen name="Exercise" component={ExerciseList} />
          <Stack.Screen name="WorkoutPlan" component={ViewPlan} />

          
          {/* Passing in the 'handleUserCompletion' function is causing warning for non-serializable data */}
          <Stack.Screen name="EndScreen" component={EndScreen} initialParams={{ handleUserCompletion }}/>


          {/* <Stack.Screen name="DashBoard" component={Dashboard} /> */}
        </Stack.Navigator>
      ) : (
        // Tab Navigator is what controls the tabs for bottom navigation bar
        <Tab.Navigator 
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarStyle: {
              backgroundColor: '#3E89E1', // Color of the tab bar
            },

            headerStyle: { backgroundColor: '#1A2633', shadowColor: 'transparent'},
            // headerStyle: { backgroundColor: '#1A2633'},

              // REMOVING SCREEN TITLE ON TOP 

              headerTitle: ' ',
              headerTintColor: 'white'            
          }}>
            
          <Tab.Screen 
            name="Recommendations" 
            component={Recommendations} 
            options={{ 
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons name={focused ? "list-sharp" : "list-outline"} color={color} size={size} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{ 
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{ 
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
              ),
            }} 
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
    <FlashMessage position="top" /> 

    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2633', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 180,
    marginBottom: 20,
    transform: [{ rotate: '270deg' }],
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    fontFamily: 'Inter-Bold',
  },
  button: {
    backgroundColor: '#3E89E1',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  noAcc: {
    fontSize: 10,
    color: 'white',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white', 
    fontFamily: 'Inter-Bold',
  },
});
