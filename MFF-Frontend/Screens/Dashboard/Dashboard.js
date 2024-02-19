
import React from 'react';
import { useState } from 'react';
import { ScrollView,
  View, Text,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity} 
 from 'react-native';

 import ExerciseCard from './components/ExerciseCard/exerciseCard';
 import WaterIntakeCard from './components/WaterIntakeCard/waterIntakeCard';


 import CircularProgress from 'react-native-circular-progress-indicator';



 const dashboardFakeData = {
  name: {
    first: 'John',
    last: 'Smith'
  },
  caloricInfo: {
    recommended: 2000,
    current: 1800
  },
  exerciseInfo: {
    type: 'min',
    recommended: 45,
    current: 15
  },
  waterInfo: {
    dailyGoalType: 'ounces',
    dailyGoal: 1,
    currentType: 'ounces',
    current: 32
  }

}


const DashboardNutrition = ({  }) => {

  const ozInGallon = 128

  const props = {
    activeStrokeWidth: 20,
    inActiveStrokeWidth: 20,
    inActiveStrokeOpacity: 0.2
  };

  // TODO: add the rest of the data for the page as useStates (exerciseInfo, caloricInfo)
  const [waterIntakeInfo, setWaterIntakeInfo] = useState({
    dailyGoalType: 'gallon',
    dailyGoal: 1,
    currentType: 'oz',
    current: 32
  });


  const updateWaterIntake = (value) => {
    setWaterIntakeInfo((prevState) => ({
      ...prevState,
      ["current"]: parseInt(value, 10),
    }));
};

  return (
    <View>
    {/* <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>Today</Text>
          </View> */}

          <Text style={styles.cardTitle}>Today</Text>
    
    <View style={styles.card}>
          
      <View style={[styles.progressContainer, {marginTop: 10}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginHorizontal: 5}}>
            <CircularProgress
              {...props}
              value={(dashboardFakeData.caloricInfo.current / dashboardFakeData.caloricInfo.recommended) * 100}
              // maxValue={2000}
              radius={50}
              activeStrokeColor={'#F1A81B'}
              inActiveStrokeColor={'#F1A81A'}
            />
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <Text style={styles.sampleProgressText}>
                Calories
              </Text>
              <Text style={[styles.sampleDataProgressText, {color: '#F1A81B'}]}>
               {dashboardFakeData.caloricInfo.current} / {dashboardFakeData.caloricInfo.recommended}
              </Text>
            </View>
          </View>

          <View style={{marginHorizontal: 5}}>
            <CircularProgress
              {...props}
              value={waterIntakeInfo.current < ozInGallon ? (waterIntakeInfo.current / (parseInt(waterIntakeInfo.dailyGoal, 10) * ozInGallon) * 100) : 100}
              // maxValue={2000}
              radius={50}
              activeStrokeColor={'#3E89E1'}
              inActiveStrokeColor={'#3E89E0'}
            />
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <Text style={styles.sampleProgressText}>
                    Water
              </Text>
              <Text style={[styles.sampleDataProgressText, {color: '#3E89E1'}]}>
                {waterIntakeInfo.current} / {parseInt(waterIntakeInfo.dailyGoal, 10) * 128} oz
              </Text>
            </View> 
          </View>

          <View style={{marginHorizontal: 5}}>
            <CircularProgress
              {...props}
              value={(dashboardFakeData.exerciseInfo.current / dashboardFakeData.exerciseInfo.recommended) * 100}
              // maxValue={2000}
              radius={50}
              activeStrokeColor={'#26A341'}
              inActiveStrokeColor={'#26A340'}
            />
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <Text style={styles.sampleProgressText}>
                Exercise
              </Text>
              <Text style={[styles.sampleDataProgressText, {color: '#26A341'}]}>
                {dashboardFakeData.exerciseInfo.current} / {dashboardFakeData.exerciseInfo.recommended} {dashboardFakeData.exerciseInfo.type === 'min' ? 'min' : 'hr'} 
              </Text>
            </View>

          </View>
        </View>

        </View>

    </View>

    <ExerciseCard/>
    <WaterIntakeCard waterInfo={waterIntakeInfo} setWaterInfo={setWaterIntakeInfo} updateWaterIntake={updateWaterIntake}/>

  </View>
  );
};


const Dashboard = ({ }) => {
  const options = ['Rarely', 'Sometimes', 'Frequently', 'Everyday'];



  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <CircularProgress value={58} /> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome Back, {dashboardFakeData.name.first}!</Text>
        </View>

        <DashboardNutrition />
        {/* <DashboardNutrition /> */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity> 
        </View> */}
      </ScrollView>
     

     
      
      {/* <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1A2633",
    // paddingTop: 60,
    justifyContent: 'center',
    // alignItems: 'center'

  },
  titleContainer: {
    // backgroundColor: '#fcc777',
    // marginRight: 30,
    // height: 60,
    // paddingLeft: ,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: '20'
    
  },
  scrollContent: {
    // margin: 0,
    // padding: 0,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: 'white',
    marginBottom: 40,
    marginTop: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: { height: 4, width: 1 }, // Shadow offset (width, height)
    textShadowRadius: 4, // Shadow blur radius
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
    padding: 5,
    marginBottom: 5,
    // marginTop: 10,

    width: 180,
    // marginLeft: 30,
    marginRight: 30,

    alignSelf: 'flex-start',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    // textShadowOffset: { height: 3, width: 1 }, // Shadow offset (width, height)
    // textShadowRadius: 6, // Shadow blur radius
  },
  cardTitleContainer: {
    marginRight: 200,
    // marginTop: 50,
    backgroundColor: "#273646",
    padding: 5,
    marginBottom: 20,
    // backgroundColor: 'white',

    // borderWidth: 2,
    // borderColor: 'white',
    borderRadius: 20,
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,

  },
  progressContainer: {
    // flexDirection: "col",
    marginBottom: 15,
    alignItems: 'center'
  },
  progressTextContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 20,
    width: 200,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    // justifyContent: 'center',
    width: 200,
    // marginLeft: 10,
    paddingLeft: 4,
    paddingTop: 3,
    paddingBottom: 3,
    // alignSelf: 'flex-start'
  },
  sampleProgress: {
    borderRadius: 10
  },
  sampleProgressText: {
    
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // padding: 4,
    borderRadius: 5

  },
  sampleDataProgressText: {
    
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    // alignSelf: 'center',
    // padding: 4,
    borderRadius: 5

  },
  inputContainer: {
    width: 300,
    // flex: 1,
    marginBottom: 15,
    // justifyContent: 'flex-start'
  },
  inputNameContainer: {
    width: 300,
    // flex: 1,
    marginBottom: 15,
    // rowGap: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'

  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: 146,
    borderRadius: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#273646',
    borderRadius: 20,
    
    // borderWidth: 2,
    // borderColor: 'white',
    height: 210,
    padding: 20,
    marginBottom: 20,
    // marginTop: 40,
    alignItems: 'center',
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  optionButton: {
    // backgroundColor: '#fcc777',
    borderWidth: 2,
    borderColor: 'white',
    // borderBottomColor
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    height: 50,
    marginVertical: 5,
    width: 200,
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  sleepAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  slider: {
    width: 300,
    height: 40,
  },
  button: {
    // marginTop: 40,
    backgroundColor: "#fcc777",
    paddingHorizontal: 30,
    // width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 30,
    // marginBottom: 
  },
  buttonText: {
    fontSize: 28,
    color: 'white', 
  },
  buttonContainer: {
    // marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 20,
    // marginBottom: 20
    // backgroundColor: "#434c57",
    color: "white"
  },
});

export default Dashboard;
