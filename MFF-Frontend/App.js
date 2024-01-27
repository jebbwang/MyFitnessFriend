import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import SignInScreen from './SignInScreen';
import Questionaire from './CreateAccount/Questionaire'; 
import WelcomePage from './CreateAccount/WelcomePage';
import ExerciseFrequencyQuestion from './CreateAccount/ExerciseFrequency';
import Dashboard from './Dashboard/Dashboard';


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
      
      <Text style={styles.noAcc}>Don't have an account? Get started!</Text>
      
      {/* sign in screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
    
    </View>
  );
}

export default function App() {
  return (
    // nav stack is here
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="SignIn" component={SignInScreen} /> 
        <Stack.Screen name="Welcome" component={WelcomePage} /> 
        <Stack.Screen name="Questionaire1" component={Questionaire} />
        <Stack.Screen name="ExerciseFrequency" component={ExerciseFrequencyQuestion} />

        <Stack.Screen name="DashBoard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014EAA', 
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
