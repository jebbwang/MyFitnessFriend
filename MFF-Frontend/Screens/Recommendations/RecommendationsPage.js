import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TipsBanner from './TipsBanner';
import ListItem from './RecommendationListItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUserContext } from '../../components/UserContext/UserContext';
import { supabase } from '../../supabase.js';

//TODO:
// 1. When recommendation is added, it should be added to the database
// 2. When recommendation is deleted, it should be deleted from the database
// 3. When recommendation is checked, it should be updated in the database

const ItemSeparator = () => <View style={{ height: 5 }} />; // space out the list items

const Recommendations = () => {
  const { userId } = useUserContext();

  const [sleepAmount, setSleepAmount] = useState();

  const [sleepText, setSleepText] = useState('');

  const [waterText, setWaterText] = useState('');

  const [foodText, setFoodText] = useState('');

  const [exerciseText, setExerciseText] = useState('');

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Convert to ISO strings
    const todayStr = today.toISOString();
    const tomorrowStr = tomorrow.toISOString();

    const fetchSleepAmount = async () => {
      const { data, error } = await supabase
        .from('User')
        .select('sleepAmount')
        .eq('authUserID', userId);

      if (error) {
        console.error('Error fetching sleep amount:', error);
        return;
      }

      if (data && data.length > 0) {
        setSleepAmount(data[0].sleepAmount);
        console.log('user id:', userId);
        console.log('Sleep amount:', sleepAmount);

        setSleepText(`Sleep at ${12 + (6 - sleepAmount)}PM to wake up at 6AM and get ${sleepAmount} hours of sleep!`);
      }
    };

    const fetchWaterData = async () => {
      const { data, error } = await supabase
          .from('UserWaterIntake')
          .select('amount')
          .eq('userId', userId)
          .gte('created_at', todayStr)
          .lt('created_at', tomorrowStr);
  
          if (error) {
            console.error('Error fetching water amount:', error);
            return;
          }
  
        if (data && data.length > 0) {
          const totalWater = data.reduce((total, record) => total + record.amount, 0);
          console.log('Total water:', totalWater);
          if (totalWater < 128) {
            setWaterText(`Drink ${(128 - totalWater)} more ounces to meet water goal!`);
          }
          else {
            setWaterText('Water goal met!');
          }
        }
        else {
          setWaterText('Drink 128 more ounces to meet water goal!');
        }
    };

    const fetchFoodData = async () => {
      const { data, error } = await supabase
          .from('UserFoodLog')
          .select('amount')
          .eq('userId', userId)
          .gte('created_at', todayStr)
          .lt('created_at', tomorrowStr);
  
          if (error) {
            console.error('Error fetching food amount:', error);
            return;
          }
  
        if (data && data.length > 0) {
          const totalCalories = data.reduce((total, record) => total + record.amount, 0);
          console.log('Total calories:', totalCalories);
          if (totalCalories < 2000) {
            setFoodText(`Eat ${(2000 - totalCalories)} more calories to meet nutrition goal!`);
          }
          else {
            setFoodText('Nutrition goal met!');
          }
        }
        else {
          setFoodText('Eat 2000 more calories to meet nutrition goal!');
        }
    };

    const fetchExerciseData = async () => {
      const { data, error } = await supabase
          .from('UserWorkouts')
          .select('amount')
          .eq('userId', userId)
          .gte('created_at', todayStr)
          .lt('created_at', tomorrowStr);
  
          if (error) {
            console.error('Error fetching exercise amount:', error);
            return;
          }
  
        if (data && data.length > 0) {
          const totalExerciseMinutes = data.reduce((total, record) => total + record.amount, 0);
          console.log('Total exercise minutes:', totalExerciseMinutes);
          if (totalExerciseMinutes < 60) {
            setExerciseText(`Workout ${(60 - totalExerciseMinutes)} more minutes to meet fitness goal!`);
          }
          else {
            setExerciseText('Fitness goal met!');
          }
        }
        else {
          setExerciseText('Workout for an hour to meet fitness goal!');
        }
    };


    fetchSleepAmount();
    fetchWaterData();
    fetchFoodData();
    fetchExerciseData();
  }, [userId, sleepText, waterText, foodText, exerciseText]);

  // useEffect(() => {
  //   const fetchFoodData = async () => {
  //     const today = selectedDate;
  //     today.setHours(0, 0, 0, 0);
  //     const tomorrow = new Date(today);
  //     tomorrow.setDate(tomorrow.getDate() + 1);
  
  //     // Convert to ISO strings
  //     const todayStr = today.toISOString();
  //     const tomorrowStr = tomorrow.toISOString();
  
  //     try {
  //       const { data, error } = await supabase
  //         .from('UserFoodLog')
  //         .select('amount')
  //         .eq('userId', userId)
  //         .gte('created_at', todayStr)
  //         .lt('created_at', tomorrowStr);
  
  //       if (error) throw error;
  
  //       const totalCalories = data.reduce((total, record) => total + record.amount, 0);
  //       console.log("TEST")
  //       console.log('Total calories:', totalCalories);
  //       setFoodText(`Eat ${(2000 - totalCalories)} more calories to meet nutrition goal!`);
  //       // setItems([{ id: '2', text: `Eat ${(2000 - totalCalories)} more calories to meet nutrition goal!`, completed: false }]);
  //     } catch (error) {
  //       console.error("Error fetching food calories: ", error);
  //     }
  //   };
  
  //   fetchFoodData();
  // }, [userId, foodText]);
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('sleepText:', sleepText);
    console.log('waterText:', waterText);
    console.log('foodText:', foodText);
    setItems([
      { id: '1', text: sleepText, completed: false },
      { id: '2', text: waterText, completed: false },
      { id: '3', text: foodText, completed: false },
      { id: '4', text: exerciseText, completed: false },
    ]);
  }, [sleepText, foodText, waterText, exerciseText]);

  const handleToggleCheckbox = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <ListItem
      text={item.text}
      isChecked={item.completed}
      onToggleCheckbox={() => handleToggleCheckbox(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  // Component to display when there are no items
  const NoRecommendationsComponent = () => (
    <View style={styles.noItemsView}>
      <Text style={styles.noItemsText}>No recommendations yet, keep it up!</Text>
    </View>
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from('User')
  //       .select('sleepAmount')
  //       .eq('authUserID', userId);

  //     if (error) throw error;

  //     if (data.length > 0) {
  //       setSleepAmount(data[0].sleepAmount);
  //       console.log('Sleep amount:', data[0].sleepAmount);
  //       const wakeUpTime = 6; // 6AM
  //       const sleepTime = wakeUpTime - sleepAmount;
  //       const sleepTimeText = sleepTime >= 0
  //         ? `Sleep at ${sleepTime}PM to wake up at ${wakeUpTime}AM and get ${sleepAmount} hours of sleep`
  //         : `Sleep at ${12 + sleepTime}AM to wake up at ${wakeUpTime}AM and get ${sleepAmount} hours of sleep`;

  //       const { data: insertData, error: insertError } = await supabase
  //         .from('UserRecommendation')
  //         .insert([{ recommendation: sleepTimeText, userId: userId}])
  //         .single();
  
  //       if (insertError) throw insertError;
  //       // TODO: INSERDATA IS RETURNING NULL

  //       console.log("marker");
  //       console.log(insertData);

  //       setItems((prevItems) => [
  //         ...prevItems,
  //         { id: insertData.id, text: sleepTimeText, completed: false },
  //       ]);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <TipsBanner />
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={NoRecommendationsComponent} // Render when the list is empty
          style={styles.list}
        />

      

      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A2633',
    marginTop: -20,
  },
  list: {
    flex: 1,
    backgroundColor: '#1A2633',
  },
  noItemsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, 
  },
  noItemsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Recommendations;
