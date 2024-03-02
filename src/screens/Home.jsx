import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {enableLatestRenderer} from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


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
 
 const Home = ({navigation, route}) => (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    </View>
 );

export default Home