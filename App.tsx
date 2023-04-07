import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import GradientMask from "./components/Gradients";
import Agora from "./components/Agora";
import LinearGradient from "react-native-linear-gradient";

const App = () => {
  const [showMainScreen, setShowMainScreen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');



  const handleJoinButtonPress = () => {
    setShowMainScreen(true);
  };
  const handleAnswerSelected = (answer: any) => {
    console.log(answer);
    setSelectedAnswer(answer);
  };
  if (!showMainScreen) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./Assets/Images/jashn_logo.png')}
            style={styles.logoImage}
          />
        </View>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleJoinButtonPress}
        >
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./Assets/Images/live_logo.png')}
          style={styles.headerImage}
        />
        <Image
          source={require('./Assets/Images/jashn_logo.png')}
          style={styles.headerImage}
        />
      </View>

      {/* Middle Screen */}
      {/* <Text style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'purple'
      }}> */}
      <Agora joined={showMainScreen} />
      {/* </Text> */}


      {/* Footer */}
      <LinearGradient 
      colors={['rgb(80, 80, 80)','rgb(0, 0, 0)' ]} 
      style={styles.footer}
      start={{ x: 0.5, y: 0 }}>
        <TouchableOpacity style={styles.footerButton}>
          <Image
            source={require('./Assets/Images/footer1.png')}
            style={styles.footerButtonImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image
            source={require('./Assets/Images/footer2.png')}
            style={styles.footerButtonImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image
            source={require('./Assets/Images/footer3.png')}
            style={styles.footerButtonImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image
            source={require('./Assets/Images/footer4.png')}
            style={styles.footerButtonImg}
          />
        </TouchableOpacity>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8f2235',
  },
  logoContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  logoImage: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  joinButton: {
    backgroundColor: '#ed5616',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 250,
    left: '10%',
    width: '80%'
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerImage: {
    width: 24,
    height: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    paddingBottom: 20,
    // backgroundColor: 'black',
  },
  footerButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  footerButtonImg: {

  },
});

export default App;