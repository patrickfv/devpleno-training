import React from 'react';
import { SafeAreaView, LogBox } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TripsScreen from './src/screens/TripsScreen';
import TripScreen from './src/screens/TripScreen';
import AddTripScreen from './src/screens/AddTripScreen';
import AddPointScreen from './src/screens/AddPointScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const StackNavigator = createStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackNavigator.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => null
          }}>
          <StackNavigator.Screen component={HomeScreen} name="Home"/>
          <StackNavigator.Screen component={TripsScreen} name="Trips"/>
          <StackNavigator.Screen component={TripScreen} name="Trip"/>
          <StackNavigator.Screen component={AddTripScreen} name="AddTrip"/>
          <StackNavigator.Screen component={AddPointScreen} name="AddPoint"/>
        </StackNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
