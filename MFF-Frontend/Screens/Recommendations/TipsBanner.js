import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TipsBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerText}>Tips for today!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#FFA337', // Yellow background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 16,
    marginTop: 32, // Depending on your layout, you may adjust this
  },
  bannerText: {
    color: '#ffffff', // White text color
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center', // Center the text
  },
});

export default TipsBanner;


