import React, { useState, useEffect } from 'react';
import { View, 
  Image, 
  FlatList, 
  TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Trip from './Trip';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TripsScreen({ navigation }) {
  const [state, setState] = useState({ trips: [] });
  const [mapState, setMapState] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.00922*1.5,
      longitudeDelta: 0.00922*1.5
  });

  const renderItem = flatItem => {
    const { item } = flatItem;
    return <Trip onPress={() => {
      navigation.navigate('Trip', { id: item.id });
    }} 
    title={item.trip} price={item.price} />
  }

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = JSON.parse(tripsAS);
    setState({ trips });
  }

  const handleMarker = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMapState({
      ...mapState,
      latitude,
      longitude
    });
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'stretch'
      }}>
      <View style={{
        flex: 1,
      }}>
        <MapView 
          style={{flex: 1}}
          initialRegion={{
            latitude: mapState.latitude,
            longitude: mapState.longitude,
            longitudeDelta: mapState.longitudeDelta,
            latitudeDelta: mapState.latitudeDelta
          }}>
          <Marker 
            coordinate={{
              latitude: mapState.latitude,
              longitude: mapState.longitude
            }}
            draggable
            onDragEnd={handleMarker}/>
        </MapView>
        <TouchableOpacity style={{
          position: 'absolute',
          bottom: 0,
          right: 20,
          padding: 10,
        }}
        onPress={() => navigation.navigate('AddTrip', { refresh: loadData, position: mapState })}>
          <Image style={{
            height: 55,
            width: 70
          }} source={require('../../../assets/icon-add-trip.png')}/>
        </TouchableOpacity> 
      </View>
      <View>
        <FlatList 
          data={state.trips}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          keyExtractor={ item => item.id.toString() } />
      </View>
    </View>
  );
}

export default TripsScreen;