import React, { useEffect, 
  useState
} from 'react'
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity
} from 'react-native'
import {enableLatestRenderer} from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { enableLatestRenderer } from "react-native-maps";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as Location from "expo-location";
import * as Speech from "expo-speech";
enableLatestRenderer();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topLeftButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  stroke:{
    width:28,
    height:28,
    borderRadius:60,
    backgroundColor: '#fff',
    zIndex:1

  },
  core:{
    width:24,
    height:24,
    backgroundColor:'#0F52BA',
    position: 'absolute',
    top: 2,
    left: 2,
    right: 1,
    bottom: 1,
    zIndex: 2,
    borderRadius: 60,
 },
});

const Home = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [chargingStations, setChargingStations] = useState([]);
  const [showStations, setShowStations] = useState(false);

  useEffect(() => {
    getUserLocation();
  }, []);


  const [userLocation, setUserLocation] = useState(null);

  
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    findChargingStations(location.coords.latitude, location.coords.longitude);
  };

  const findChargingStations = async (lat, lng) => {
    const API_KEY = "AIzaSyCA2R00ALiL46Rqxnn8ZLJfyBpAwXzQYSY";
    const radius = 50000; // 5km radius
    const type = "charging_station";

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setChargingStations(data.results);
    } catch (error) {
      console.error("Error fetching charging stations:", error);
    }
  };

  const speakAndShowChargingStations = () => {
    setShowStations(true);

    if (chargingStations.length === 0) {
      Speech.speak("No charging stations found nearby.");
      return;
    }

    const stationsCount = Math.min(chargingStations.length, 3); // Speak details of up to 3 stations

    Speech.speak(`The closest ${stationsCount} charging stations are`);
    chargingStations.slice(0, stationsCount).forEach((station, index) => {
      Speech.speak(`Station ${index + 1}: ${station.name}.`);
    });
    Speech.speak("Which one would you like to go?");
  };

  const changeRoute = (index) => {
    Speech.speak(`Rerouting to station ${index}`);
    setShowStations(false)
  }

  return (
    <View style={styles.container}>
      {latitude && longitude && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Your Location"
            image={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1783/1783356.png'
            }}
          />
          {showStations &&
            chargingStations.map((station) => (
              <Marker
                key={station.place_id}
                coordinate={{
                  latitude: station.geometry.location.lat,
                  longitude: station.geometry.location.lng,
                }}
                title={station.name}
              />
            ))}
          >
          <View style={styles.currentLoc}>
            <View style={styles.stroke}/>
            <View style={styles.core}/>
          </View>
          </Marker>
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={speakAndShowChargingStations}
        >
          <Text style={styles.buttonText}>Charging Stations</Text>
        </TouchableOpacity>
      </View>
      { showStations && 
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={() => changeRoute(1)}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() => changeRoute(2)}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() => changeRoute(3)}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
  
};

export default Home;
