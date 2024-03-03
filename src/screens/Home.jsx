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
 
 const Home = ({navigation, route}) => {

  const speak = () => {
    const thingToSay = 'The closest 3 charging stations are';
    Speech.speak(thingToSay);
  };

  // const [ latitude, setLatitude ] = useState(45.4231)
  // const [ longitude, setLongitude ] = useState(-75.6831)
  const [userLocation, setUserLocation] = useState(null);

  
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Not granted")
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
    // You can now use location.coords.latitude and location.coords.longitude
    // setLatitude(location.coords.latitude)
    // setLongitude(location.coords.longitude)
    
    console.log("Found:", location)
  };
  
  getUserLocation()
  
  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
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
        </MapView>
      )}
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
