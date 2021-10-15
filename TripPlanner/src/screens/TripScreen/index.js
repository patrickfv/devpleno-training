import React, { useState, useEffect } from 'react';
import { View,  
  Text, 
  TouchableOpacity, 
  FlatList, 
  TouchableWithoutFeedback, 
  Image, 
  StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TripScreen({ navigation, route }) {
  const [state, setState] = useState({
    points: [],
    trip: ''
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = JSON.parse(tripsAS);
    
    const id = route.params.id;
    const pointsAS = await AsyncStorage.getItem('trip-'+id);
    let points = JSON.parse(pointsAS);

    let trip = {
      id,
      trip: '',
      price: 0
    }
    trips.forEach(t => {
      if(t.id === id) {
        trip = t;
      }
    });

    setState({ 
      trip,
      points
    });
  }

  const renderItem = flatItem => {
    const { item } = flatItem;
    
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 10
        }}>
        <View style={{
          flex: 1
        }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold'
        }}>{item.pointName}</Text>
        <Text>{item.description}</Text>
        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16
        }}>
          <Text style={{
            textAlign: 'right',
            fontWeight: 'bold',
            color: '#24C6DC'
          }}>{item.price}</Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image style={{
          flex: 1
        }} source={{ 
          uri: 'https://images.unsplash.com/photo-1500111709600-7761aa8216c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' 
        }} />
        <View style={styles.backButton}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icon-chevron-left.png')}/>
          </TouchableWithoutFeedback>
        </View>
        {
          (state.trip) 
          ?
          <React.Fragment>
            <Text style={styles.tripName}>{state.trip.trip}</Text>
            <Text style={styles.tripPrice}>{state.trip.price}</Text>
          </React.Fragment>
          : 
            null
        }  
          <TouchableOpacity style={{
            position: 'absolute',
            bottom: 40,
            right: 20,
            padding: 10,
          }}
          onPress={() => navigation.navigate('AddPoint', { id: route.params.id, refresh: loadData })}>
            <Image style={{
              height: 55,
              width: 70
            }} source={require('../../../assets/icon-add-trip.png')}/>
          </TouchableOpacity>

      </View>
      <FlatList 
        style={{
          flex: 1
        }}
        data={state.points}
        renderItem={renderItem}
        keyExtractor={ item => item.id.toString() }/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    height: 250,
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
  }
});

export default TripScreen;
