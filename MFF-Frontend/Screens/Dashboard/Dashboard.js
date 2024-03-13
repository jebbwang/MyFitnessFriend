
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ScrollView,
  View, Text,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity} 
 from 'react-native';

 import ExerciseCard from './components/ExerciseCard/exerciseCard';
 import WaterIntakeCard from './components/WaterIntakeCard/waterIntakeCard';
 import NextWorkoutCard from './components/NextWorkoutCard/nextWorkoutCard';


 import CircularProgress from 'react-native-circular-progress-indicator';
import LogCard from './components/FoodLogCard/logCard';

 import { useUserContext } from '../../components/UserContext/UserContext';
 import { supabase } from '../../supabase.js';

 import DateTimePicker from '@react-native-community/datetimepicker';
 import DateTimePickerModal from "react-native-modal-datetime-picker";
 import { FontAwesome } from '@expo/vector-icons';
 import moment from 'moment'; 


 const dashboardFakeData = {
  name: {
    first: '',
    last: ''
  },
  caloricInfo: {
    recommended: 2000,
    current: 0
  },
  exerciseInfo: {
    type: 'min',
    recommended: 45,
    current: 0
  },
  waterInfo: {
    dailyGoalType: 'ounces',
    dailyGoal: 1,
    currentType: 'ounces',
    current: 0
  }

}


const DashboardNutrition = ({  }) => {
  const [workoutPlanItems, setWorkoutPlanItems] = useState([]);
  const workoutArraySize = 25
  const [completedWorkouts, setCompletedWorkouts] = useState(new Array(workoutArraySize).fill(0)) // length was previously workoutPlanItems.length but dynamic data costed a lot of speed, switched to static max

  // -- CONSTANT VARS --
  const { userId } = useUserContext();

  const ozInGallon = 128
  const minInHour = 60

  // -------------------

  const props = {
    activeStrokeWidth: 20,
    inActiveStrokeWidth: 20,
    inActiveStrokeOpacity: 0.2
  };

  handleSetCompletedWorkouts = ( updatedList ) => {
    setCompletedWorkouts(updatedList)
    console.log(completedWorkouts)
  }

  const handleSetWorkoutPlanItems = (newWorkout) => {
    setWorkoutPlanItems([...workoutPlanItems, newWorkout]);
    console.log(workoutPlanItems);
  }

  const removeItemFromList = (itemToRemove) => {
    // Use the filter method to create a new array without the item to remove
    const updatedItems = workoutPlanItems.filter(item => item !== itemToRemove);
    setWorkoutPlanItems(updatedItems);
  };

  // TODO: add the rest of the data for the page as useStates (exerciseInfo, caloricInfo)
  const [waterIntakeInfo, setWaterIntakeInfo] = useState({
    dailyGoalType: 'gallon',
    dailyGoal: 1,
    currentType: 'oz',
    current: 0
  });

  const [exerciseInfo, setExerciseInfo] = useState({
    dailyGoalType: 'hour',
    dailyGoal: 1,
    currentType: 'min',
    current: 0
  });

  // Update the UserWorkouts table in the Supabase table
  const updateExerciseInfo = async (value) => {
    try {
      const { data, error } = await supabase
        .from('UserWorkouts')
        .insert({ amount: parseInt(value, 10), userId: userId });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }

    
    setExerciseInfo((prevState) => ({
      ...prevState,
      ["current"]: parseInt(value, 10),
    }));
    // TODO: update exerciseinfo table;
  };
  
  // date from the time picker
  const [selectedDate, setSelectedDate] = useState(new Date());


  const updateWaterIntake = (value) => {
    // setWaterIntakeInfo((prevState) => ({
    //   ...prevState,
    //   ["current"]: parseInt(value, 10),
    // }));

    updateWaterIntakeInTable(value);
  };

  // Update the UserWaterIntake table in the Supabase table
  const updateWaterIntakeInTable = async (value) => {
    try {
      const { data, error } = await supabase
        .from('UserWaterIntake')
        .insert({ amount: parseInt(value, 10), userId: userId });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }

    setWaterIntakeInfo((prevState) => ({
      ...prevState,
      ["current"]: prevState.current + parseInt(value, 10),
    }));
  };
  // useEffect runs once the component is mounted aka when the page is first loaded, anything after that happens outside of this function
  // Fetch the water intake and workout data from the corresponding tables in the Supabase database
  useEffect(() => {
    const fetchDashboardData = async () => {
      const today = selectedDate;
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
  
      // Convert to ISO strings
      const todayStr = today.toISOString();
      const tomorrowStr = tomorrow.toISOString();
  
      try {
        const { data, error } = await supabase
          .from('UserWaterIntake')
          .select('amount')
          .eq('userId', userId)
          .gte('created_at', todayStr)
          .lt('created_at', tomorrowStr);
  
        if (error) throw error;
  
        const totalWaterIntake = data.reduce((total, record) => total + record.amount, 0);
        setWaterIntakeInfo((prevState) => ({
          ...prevState,
          ["current"]: totalWaterIntake,
        }));
      } catch (error) {
        console.error("Error fetching water intake: ", error);
      }

      try {
        const { data, error } = await supabase
          .from('UserWorkouts')
          .select('amount')
          .eq('userId', userId)
          .gte('created_at', todayStr)
          .lt('created_at', tomorrowStr);
  
        if (error) throw error;
  
        const totalExerciseMinutes = data.reduce((total, record) => total + record.amount, 0);
        setExerciseInfo((prevState) => ({
          ...prevState,
          ["current"]: totalExerciseMinutes,
        }));
      } catch (error) {
        console.error("Error fetching exercise amount: ", error);
      }
    };
  
    fetchDashboardData();
  }, [selectedDate]);

  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate;
    setSelectedDate(currentDate);
    console.log("A date has been picked: ", selectedDate);
    hideDatePicker();
  };

  const isToday = (targetDate) => {
    const today = new Date();
    return targetDate.getDate() === today.getDate() &&
      targetDate.getMonth() === today.getMonth() &&
      targetDate.getFullYear() === today.getFullYear();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <View style={styles.subheaderContainer}>
        <Text style={styles.cardTitle}>{moment(selectedDate).format('MMMM D, YYYY')}</Text>
        <FontAwesome name="calendar-o" size={25} color="white" onPress={showDatePicker}/>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={onDateChange}
          onCancel={hideDatePicker}
          themeVariant="light"
        />
      </View>
    <View style={styles.card}>
          
      <View style={[styles.progressContainer, {marginTop: 10}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginHorizontal: 5}}>
            <CircularProgress
              {...props}
              value={(dashboardFakeData.caloricInfo.current / dashboardFakeData.caloricInfo.recommended) * 100}
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
              value={waterIntakeInfo.current < ozInGallon ? (waterIntakeInfo.current / (parseInt(waterIntakeInfo.dailyGoal, 10) * 128) * 100) : 100}
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
              value={exerciseInfo.current < minInHour ? (exerciseInfo.current / (parseInt(exerciseInfo.dailyGoal, 10) * minInHour) * 100) : 100}
              radius={50}
              activeStrokeColor={'#26A341'}
              inActiveStrokeColor={'#26A340'}
            />
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <Text style={styles.sampleProgressText}>
                Exercise
              </Text>
              <Text style={[styles.sampleDataProgressText, {color: '#26A341'}]}>
              {exerciseInfo.current} / {parseInt(exerciseInfo.dailyGoal, 10) * minInHour} min
              </Text>
            </View>

          </View>
        </View>

        </View>

    </View>

    
    {isToday(selectedDate) ? (
      <>
        <ExerciseCard items={workoutPlanItems} exerciseInfo={exerciseInfo} updateExerciseInfo={updateExerciseInfo}  handleAddItems={handleSetWorkoutPlanItems} handleRemove={removeItemFromList} completedWorkouts={completedWorkouts} handleSetCompletedWorkouts={handleSetCompletedWorkouts}/>
        <LogCard />
        <WaterIntakeCard waterInfo={waterIntakeInfo} setWaterInfo={setWaterIntakeInfo} updateWaterIntake={updateWaterIntake}/>
        <NextWorkoutCard items={workoutPlanItems} exerciseInfo={exerciseInfo} updateExerciseInfo={updateExerciseInfo} handleAddItems={handleSetWorkoutPlanItems} handleRemove={removeItemFromList} completedWorkouts={completedWorkouts} handleSetCompletedWorkouts={handleSetCompletedWorkouts}/>

      </>
    ) : null}

  </View>
  );
};


const Dashboard = ({  }) => {
  const options = ['Rarely', 'Sometimes', 'Frequently', 'Everyday'];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { userId } = useUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('User')
          .select('firstName, lastName')
          .eq('authUserID', userId);

        if (error) throw error;

        if (data.length > 0) {
          setFirstName(data[0].firstName);
          setLastName(data[0].lastName);
        }
      } catch (error) {
        console.error("Error fetching user data (first and last name): ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{height: 700}}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back, {firstName}!</Text>
          </View>

          <DashboardNutrition />
      </ScrollView>
      </View>
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
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: 'white',
    paddingLeft: 5,
    marginBottom: 5,
    // marginTop: 10,

    // width: 180,
    // marginLeft: 30,
    marginRight: 30,

    alignSelf: 'flex-start',
  },
  cardTitleContainer: {
    marginRight: 200,
    // marginTop: 50,
    backgroundColor: "#273646",
    padding: 5,
    marginBottom: 20,
    borderRadius: 20,

  },
  progressContainer: {
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
  subheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 5,
  },
});

export default Dashboard;
