import React, { useReducer } from 'react';
import { Dimensions, TextInput, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dinero from 'dinero.js';
import { TextInputMask } from 'react-native-masked-text';
import { toInteger } from 'lodash';

const { height } = Dimensions.get('window');

const INITIAL_STATE = {
  id: new Date().getTime(),
  position: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.00922*1.5,
    longitudeDelta: 0.00922*1.5
  },
  pointName: '',
  description: '',
  price: 0
}

function AddPointScreen({ navigation, route }) {
  const [state, setState] = useReducer((state, action) => {
    switch(action.field) {
      case 'position':
        return {
          ...state,
          position: {
            ...state.position,
            ...action.value
          }
      }
      case 'id': 
        return;
      default:
        return {
          ...state,
          [action.field]: action.value
        }
    }
  }, INITIAL_STATE);

  const handleMarker = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setState({
      field: 'position', 
      value: {
        latitude,
        longitude
      }
    });
  }

  const handleChangeText = field => value  => {
    setState({ field, value });
  }

  const handleSave = async () => { 
    const id = route.params.id;
    const pointAS = await AsyncStorage.getItem('trip-'+id);
    let points = [];
    if(pointAS) {
      points = JSON.parse(pointAS);
    }
    points.push(state);
    await AsyncStorage.setItem('trip-'+id, JSON.stringify(points));
    let total = Dinero({
      amount: 0,
      currency: 'BRL',
      precision: 2
    });
    points.forEach((p) => {
      const integer = priceToInteger(p.price);
      total = total.add(Dinero({
        amount: integer,
        currency: 'BRL',
        precision: 2
      }));
    });

    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if(tripsAS) {
      trips = JSON.parse(tripsAS);
    }
    trips.forEach((trip, index) => {
      if(trip.id === id) {
        trips[index].price = `R$ ${total.toFormat()}`;
        trips[index].latitude = points[0].latitude;
        trips[index].longitude = points[0].longitude;
      }
    });
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
    route.params.refresh();
    navigation.goBack();
  }

  const priceToInteger = (priceText) => {
    const text = priceText.replace('R$', '').replace('.', '').replace(',', '');
    return toInteger(text);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
          <MapView style={{ flex: 1 }} 
            initialRegion={{
              latitude: state.position.latitude,
              longitude: state.position.longitude,
              longitudeDelta: state.position.latitudeDelta,
              latitudeDelta: state.position.longitudeDelta
            }}>
            <Marker 
              coordinate={{
              latitude: state.position.latitude,
              longitude: state.position.longitude
            }}
            draggable
            onDragEnd={handleMarker} />
          </MapView>
        <View style={styles.backButton}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icon-chevron-left.png')}/>
          </TouchableWithoutFeedback>
        </View>
        
          <Text style={styles.tripName}>{state.pointName}</Text>
          <Text style={styles.tripPrice}>{state.price}</Text>

      </View>
      <TextInput style={styles.input} placeholder="Nome" onChangeText={ handleChangeText('pointName')} />
      <TextInput style={styles.input} placeholder="Descrição" onChangeText={handleChangeText('description')} />
      <TextInputMask style={styles.input} placeholder="Preço" onChangeText={handleChangeText('price')} type={'money'} value={state.price} />      
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
            <Text style={styles.btnText}>SALVAR</Text>
      </TouchableOpacity>        
    </View>
  );
  
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    height: height / 2
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
    color: 'white',
    borderRadius: 8
  },
  tripName: {
    position: 'absolute',
    bottom: 16,
    left: 32,
    textAlign: 'right',
    backgroundColor: 'purple',
    padding: 4,
    color: 'white',
    borderRadius: 8
  },
  input:{
    fontSize: 20,
    margin: 10,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  btn: {
    backgroundColor: '#ccc',
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

export default AddPointScreen;
