import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import Tts from 'react-native-tts'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Speech from 'expo-speech';

enableLatestRenderer();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

const Home = ({ navigation, route }) => {

  const speak = () => {
    const thingToSay = 'The closest 3 charging stations are';
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={speak}>
          <Text style={styles.buttonText}>Charging Stations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Add functionality for second button */}}>
          <Text style={styles.buttonText}>Weather Conditions</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.topLeftButton} onPress={() => {/* Add functionality for top-left button */}}>
        <Text style={styles.buttonText}> 2H 45M Left</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
