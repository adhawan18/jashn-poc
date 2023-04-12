import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import GradientMask from "./components/Gradients";
import Agora from "./components/Agora";
import PhoneNumber from "./components/noVerification";
import OtpVerificationWindow from "./components/OtpVerification";
import LinearGradient from "react-native-linear-gradient";
import Leaderboard from './components/Leaderboard';

const App = () => {
  const [showMainScreen, setShowMainScreen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [otpSent, setOtpSent] = useState(false);



  const handleJoinButtonPress = () => {
    setOtpSent(true);
  };
  const handleOtpJoin = () => {
    setShowMainScreen(true);
  };
  const handleAnswerSelected = (answer: any) => {
    console.log(answer);
    setSelectedAnswer(answer);
  };
  if (!showMainScreen && !otpSent) {
    return (
      <ImageBackground style={styles.container} source={require('./Assets/Images/OvalTransparent.png')} >
        <View style={styles.logoContainer}>
          <Image
            source={require('./Assets/Images/jashnLogoWBG.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>India ka live game show app</Text>
        </View>

        <PhoneNumber />
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleJoinButtonPress}
        >
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </ImageBackground>
      // <Leaderboard />
    );
  }
  if (!showMainScreen && otpSent) {
    return (
      <ImageBackground style={styles.container} source={require('./Assets/Images/OvalTransparent.png')} >
        <View style={styles.logoContainer}>
          <Image
            source={require('./Assets/Images/jashnLogoWBG.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>India ka live game show app</Text>
        </View>

        <OtpVerificationWindow />
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleOtpJoin}
        >
          <Text style={styles.joinButtonText}>Verify</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
  return (
    <ImageBackground style={styles.container} source={require('./Assets/Images/OvalTransparent.png')} >
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

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2733E7'
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
    width: '25%',
    height: 20,
    resizeMode: 'contain',
  },
});

export default App;