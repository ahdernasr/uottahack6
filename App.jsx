import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './src/screens/Home';
import Welcome from './src/screens/Welcome';
import Ai from './src/screens/Ai';
import Voice from './src/screens/Voice';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Ai" component={Ai} />
        <Stack.Screen name="Voice" component={Voice } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});