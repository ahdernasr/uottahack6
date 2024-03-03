import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const icon2 = require('../../assets/icon3.png');

const Welcome = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.carText}>Ahmad's Mustang</Text>
        <Ionicons name="happy-outline" size={24} color="grey" style={styles.smileyIcon} />
      </View>
      <View style={styles.batteryContainer}>
        <Ionicons name="battery-full-outline" size={24} color="grey" style={styles.batteryIcon} />
        <Text style={styles.batteryText}>100%</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={icon2} style={styles.logo} />
      </View>
      <TouchableOpacity 
        style={styles.touchableArea} 
        onPress={() => navigation.navigate("Voice")}
      >
        <Ionicons name="car" size={24} color="grey" />
        <Text style={styles.touchableText}>My Vehicle</Text>
        <Ionicons name="chevron-forward" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.touchableArea} 
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={24} color="grey" />
        <Text style={styles.touchableText}>Navigation</Text>
        <Ionicons name="chevron-forward" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.touchableArea} 
        onPress={() => navigation.navigate("Ai")}
      >
        <Ionicons name="search" size={24} color="grey" />
        <Text style={styles.touchableText}>Artificial Intelligence</Text>
        <Ionicons name="chevron-forward" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.touchableArea} 
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings" size={24} color="grey" />
        <Text style={styles.touchableText}>Settings</Text>
        <Ionicons name="chevron-forward" size={24} color="grey" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25272C',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Adjust the margin as needed
  },
  carText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10, // Adjust the margin as needed
    marginTop: 40,
  },
  smileyIcon: {
    marginTop: 20, // Adjust as needed for vertical alignment
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  batteryIcon: {
    marginRight: 10,
  },
  batteryText: {
    color: 'white',
    fontSize: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  logo: {
    width: 400,
    height: 250,
    marginTop: 50,
    resizeMode: 'contain',
  },
  touchableArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#25272C',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 400, // Set a fixed width
  },
  touchableText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Add margin to separate icon and text
  },
});

export default Welcome;
