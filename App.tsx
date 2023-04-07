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
      <LinearGradient style={styles.container} colors={['#402d74', '#f82e84']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
        <View style={styles.logoContainer}>
          <Image
            source={require('./Assets/Images/jashnLogoWBG.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>India ka live game show app</Text>
        </View>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleJoinButtonPress}
        >
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient style={styles.container} colors={['#402d74', '#f82e84']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./Assets/Images/jashnLogoWBG.png')}
          style={styles.headerImage}
        />
        <Image
          source={require('./Assets/Images/live_logo.png')}
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

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'red'
  },
  logoImage: {
    marginTop: '20%',
    width: "95%",
    resizeMode: 'contain',
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
    paddingHorizontal: '10%',
    paddingVertical: '3%',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  headerImage: {
    width:'25%',
    height:20,
    resizeMode: 'contain',
  },
});

export default App;