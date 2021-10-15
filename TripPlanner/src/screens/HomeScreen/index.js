import React, { useState } from 'react';
import { View, ImageBackground, Image, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import assets from './assets';

function HomeScreen({ navigation }) {
  const [state, setState] = useState({ show: true });

  const handleOnPress = () => {
    if(state.show) {
      setState({ show: false });
      return;
    }
    navigation.navigate('Trips');
  }

  return (
    <ImageBackground
      source={assets.background}
      resizeMode="stretch"
      style={styles.background}>
      <View style={styles.wrapperLogoTripPlanner}>
        <Image source={assets.tripplanner} />
      </View>
      <View style={styles.wrapperLogoDevPleno}>
        <Image source={assets.devpleno} />
      </View>
      {!state.show ?
        <TouchableWithoutFeedback onPress={handleOnPress}>
          <View style={styles.buttonBackground}>
            <Text style={styles.buttonText}>Começar</Text>
          </View>
        </TouchableWithoutFeedback>
        :
        <TouchableWithoutFeedback onPress={handleOnPress}>
          <View style={styles.buttonBackground}>
            <Image source={assets.pin} />
            <Text style={styles.buttonText}>Vamos planejar sua primeira viagem!</Text>
            <Image source={assets.arrow} />
          </View>
        </TouchableWithoutFeedback>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  wrapperLogoTripPlanner: { 
    flex: 1, alignItems: 'center', 
    justifyContent: 'center' 
  },
  wrapperLogoDevPleno: { 
    flex: 1, 
    alignItems: 'flex-end', 
    justifyContent: 'center', 
    paddingBottom: 32 
  },
  buttonBackground: { 
    backgroundColor: 'white', 
    width: '100%', 
    alignItems: 'center', 
    paddingBottom: 16, 
    paddingTop: 16 
  },
  buttonText: { 
    textAlign: 'center', 
    fontSize: 18 
  },
  buttonEmptyStateBackground: { 
    backgroundColor: 'white', 
    paddingBottom: 16, 
    paddingTop: 16, 
    alignItems: 'center' 
  },
  buttonEmptyStateText: { 
    textAlign: 'center', 
    fontSize: 18, 
    color: 'black', 
    width: 220 
  },
  pin: { 
    marginTop: 16, 
    marginBottom: 16 
  },
  arrow: { 
    marginTop: 16 
  }
});

export default HomeScreen;