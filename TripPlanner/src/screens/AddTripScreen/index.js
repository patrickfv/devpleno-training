import React, { useState } from 'react';
import { 
  TextInput, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddTripScreen({ navigation, route }) {

  const [state, setState] = useState({ trip: '' });

  const handleSave = async () => {
    const trip = {
      id: new Date().getTime(),
      trip: state.trip,
      price: 0,
      latitude: route.params.position.latitude,
      longitude: route.params.position.longitude
    }
    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if(tripsAS) {
      trips = JSON.parse(tripsAS);
    }
    trips.push(trip);
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
    route.params.refresh();
    navigation.goBack();
  }

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      resizeMode="stretch"
      style={{
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
        <TextInput style={styles.input} placeholder="Nome da Viagem" onChangeText={text => setState({ trip: text })} />
        <TouchableOpacity style={styles.btn} onPress={handleSave}>
              <Text style={styles.btnText}>SALVAR VIAGEM</Text>
        </TouchableOpacity>
      </ImageBackground>

  );
  
}

const styles = StyleSheet.create({
  header: {
    height: 120
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 0
  },
  tripPrice: {
    position: 'absolute',
    bottom: 16,
    right: 32,
    textAlign: 'right',
    backgroundColor: 'purple',
    padding: 4,
    color: 'white'
  },
  tripName: {
    position: 'absolute',
    left: 16,
    bottom: 16
  },
  input:{
    fontSize: 20,
    margin: 10,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 250
  },
  btn: {
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center'
  }
});

export default AddTripScreen;
