
import React from 'react';
import { ScrollView,
  View, Text,
   TextInput, Button, StyleSheet,
    Platform, TouchableOpacity} 
 from 'react-native';

 import CircularProgress from 'react-native-circular-progress-indicator';
 import { CircularProgressBase } from 'react-native-circular-progress-indicator';



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
  }

}

// const Dashboard = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Dashboard</Text>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
 
// });

// export default Dashboard;






const DashboardNutrition = ({  }) => {
  const options = ['Lose weight', 'Maintain weight', 'Build muscle'];

  const props = {
    activeStrokeWidth: 20,
    inActiveStrokeWidth: 20,
    inActiveStrokeOpacity: 0.2
  };

  return (
    <View style={styles.card}>
          {/* <View style={styles.cardTitleContainer}> */}
            <Text style={styles.cardTitle}>Overview</Text>
          {/* </View> */}
          

      <View style={[styles.progressContainer, {marginTop: 20}]}>

          <CircularProgressBase
            {...props}
            value={(dashboardFakeData.caloricInfo.current / dashboardFakeData.caloricInfo.recommended) * 100}
            radius={60}
            activeStrokeColor={'#ff711a'}
            inActiveStrokeColor={'#ff711a'}
          >
            <CircularProgressBase
              {...props}
              value={(dashboardFakeData.exerciseInfo.current / dashboardFakeData.exerciseInfo.recommended) * 100}
              radius={42}
              activeStrokeColor={'#badc58'}
              inActiveStrokeColor={'#badc58'}
            >
              <CircularProgressBase
                {...props}
                value={62}
                radius={25}
                activeStrokeColor={'#18dcff'}
                inActiveStrokeColor={'#18dcff'}
              />
            </CircularProgressBase>
          </CircularProgressBase>

          <View style={styles.progressTextContainer}>
            <View style={{borderRadius: 10, marginBottom: 10}}>
              <Text style={styles.sampleProgressText}>
                    Remaining:
              </Text>
            </View>

            <View style={{borderRadius: 10, backgroundColor: '#ff711a', marginBottom: 10}}>
              <Text style={styles.sampleProgressText}>
                Calories: {dashboardFakeData.caloricInfo.recommended - dashboardFakeData.caloricInfo.current} 

              </Text>
            </View>

            <View style={{borderRadius: 10, backgroundColor: '#badc58',  marginBottom: 10}}>
              <Text style={styles.sampleProgressText}>
                Exercise: {dashboardFakeData.exerciseInfo.recommended - dashboardFakeData.exerciseInfo.current} {dashboardFakeData.exerciseInfo.type === 'min' ? 'min' : 'hr'} 
              </Text>
            </View>

            <View style={{borderRadius: 10, backgroundColor: '#18dcff'}}>
              <Text style={styles.sampleProgressText}>
                    Something else
              </Text>
            </View>
            
          
          </View>

        </View>

        {/* <View>

        </View> */}
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
        <DashboardNutrition />
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
    backgroundColor: "#014EAA",
    // paddingTop: 60,
    justifyContent: 'center',
    // alignItems: 'center'

  },
  titleContainer: {
    // backgroundColor: '#fcc777',
    // marginRight: 30,
    // height: 60,
    // paddingLeft: ,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 25,
    fontWeight: '800',
    color: 'white',
    padding: 5,
    // marginBottom: 20,
    // marginTop: 10,

    // width: 135,
    // marginLeft: 30,
    // marginRight: 30,

    alignSelf: 'flex-start',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: { height: 3, width: 1 }, // Shadow offset (width, height)
    textShadowRadius: 6, // Shadow blur radius
  },
  cardTitleContainer: {
    // marginRight: 130,
    // backgroundColor: "#fcc777",
    backgroundColor: '#014EAA',

    // borderWidth: 2,
    // borderColor: 'white',
    borderRadius: 10
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10
  },
  progressContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: 'center'
  },
  progressTextContainer: {
    marginBottom: 10,
    marginLeft: 10,
    width: 200,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 4,
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
    backgroundColor: '#3E89E1',
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: 'white',
    height: 420,
    padding: 20,
    marginBottom: 50,
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
