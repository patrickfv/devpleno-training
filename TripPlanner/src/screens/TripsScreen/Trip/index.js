import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';

const { width } = Dimensions.get('window');

function TripsScreen({ price, title, onPress }) {

  return (
      <TouchableOpacity {...{ onPress }} style={styles.wrapperTrip}>
        <View style={styles.image}>
          <Image style={{
            flex: 1
          }} source={{ 
            uri: 'https://images.unsplash.com/photo-1500111709600-7761aa8216c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' 
          }} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  wrapperTrip: {
    paddingTop: 10,
    paddingLeft: 16
  },
  image: {
    width: width - 32,
    height: 144,
    marginBottom: 6
  },
  price: {
    position: 'absolute',
    top: 144-16,
    right: 32,
    textAlign: 'right',
    backgroundColor: 'purple',
    padding: 4,
    color: 'white',
    borderRadius: 8
  },
  title: {
    position: 'absolute',
    top: 144-16,
    left: 32,
    textAlign: 'right',
    backgroundColor: 'purple',
    padding: 4,
    color: 'white',
    borderRadius: 8
  }
});

export default TripsScreen;