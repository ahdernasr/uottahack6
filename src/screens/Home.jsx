import React, { useEffect, 
  useState
} from 'react'
import { StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  PermissionsAndroid 
} from 'react-native'
import {enableLatestRenderer} from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as Location from 'expo-location';

enableLatestRenderer();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 100,
    height: Dimensions.get('window').height-400,
    width: Dimensions.get('window').width-30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 



 const Home = ({navigation, route}) => {
  const [ latitude, setLatitude ] = useState(45.4231)
  const [ longitude, setLongitude ] = useState(-75.6831)
  
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Not granted")
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    // You can now use location.coords.latitude and location.coords.longitude
    setLatitude(location.coords.latitude)
    setLongitude(location.coords.longitude)
    
    console.log("Found:", location)
  };
  
  getUserLocation()
  
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    </View>
 )};


export default Home