import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  ExtensionInfo
} from 'react-native-agora';
import RtmEngine from 'agora-react-native-rtm';

const appId = '70e1a03bf90645718299160e0fb1b38e';
const channelName = 'test1';
const token = "00670e1a03bf90645718299160e0fb1b38eIADEnbBHBYI81PYGAcFTHpX/gzzOGmbX+P08KQWr27fm/gx+f9gAAAAAIgCnEk8FkvApZAQAAQAirShkAgAirShkAwAirShkBAAirShk";
const uid = parseInt(generateRandomNumber());

function generateRandomNumber(): string {
  let randomNumber: string = '';
  for (let i = 0; i < 10; i++) {
    randomNumber += Math.floor(Math.random() * 10).toString();
  }
  return randomNumber;
}

const App = () => {
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const rtmEngineRef = new RtmEngine();
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(false); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      let fetchedToken = await FetchToken();
      console.log(fetchedToken);
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(fetchedToken, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster
        });
      } else {
        setIsJoined(true);
        agoraEngineRef.current?.joinChannel(fetchedToken, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience
        });
        await rtmEngineRef.createClient(appId).catch((e) => console.log(e));
        let fetchedRtmToken = await FetchRtmToken(uid);
        await rtmEngineRef?.login({ uid: uid.toString(), token: fetchedRtmToken }).catch((e) => console.log(e));
        await rtmEngineRef?.joinChannel('demoChannel').catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Fetches the <Vg k="VSDK" /> token
  const FetchToken = async (): Promise<string> => {
    const response = await fetch('https://virtuelly-meta.herokuapp.com/rte/test1/publisher/uid/0/?expiry=3600');
    const data = await response.json();
    let token = data.rtcToken;
    return token;
  };

  //fetch rtm token
  const FetchRtmToken = async (userId: any): Promise<string> => {
    const response = await fetch('https://virtuelly-meta.herokuapp.com/rtm/' + userId + '/?expiry=3600');
    const data = await response.json();
    let token = data.rtmToken;
    return token;
  };


  const leave = async() => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      // await rtmEngineRef?.leaveChannel('demoChannel').catch((e) => console.log(e));
      await rtmEngineRef?.logout().catch((e) => console.log(e));;

    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
    initRTM();
  });

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') { await getPermission() };
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: (_connection, Uid) => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
        onRequestToken: async _connection => {
          console.log('token expired');
          let fetchedToken = await FetchToken();
          agoraEngine.renewToken(fetchedToken);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  const initRTM = async () => {

    rtmEngineRef?.on('error', (evt) => {
      console.log(evt);
    });

    // rtmEngineRef?.on('channelMemberJoined', (evt) => {
    //   let {channelName, seniors, peerIds, inCall} = this.state;
    //   let {channelId, uid} = evt;
    //   // if we're in call and receive a lobby message and also we're the senior member (oldest member in the channel), signal channel status to joined peer
    //   if (inCall && channelId === 'lobby' && seniors.length < 2) {
    //     rtmEngineRef
    //       ?.sendMessageToPeer({
    //         peerId: uid,
    //         text: channelName + ':' + (peerIds.length + 1),
    //         offline: false,
    //       })
    //       .catch((e) => console.log(e));
    //   }
    // });

    // rtmEngineRef?.on('channelMemberLeft', (evt) => {
    //   let {channelId, uid} = evt;
    //   let {channelName, seniors, inCall, peerIds, rooms} = this.state;
    //   if (channelName === channelId) {
    //     // Remove seniors UID from state array
    //     this.setState({
    //       seniors: seniors.filter((id) => id !== uid),
    //       rooms: {...rooms, [channelName]: peerIds.length},
    //     });
    //     if (inCall && seniors.length < 2) {
    //       // if we're in call and we're the senior member (oldest member in the channel), signal channel status to all users
    //       rtmEngineRef
    //         ?.sendMessageByChannelId(
    //           'lobby',
    //           channelName + ':' + (peerIds.length + 1),
    //         )
    //         .catch((e) => console.log(e));
    //     }
    //   }
    // });

    rtmEngineRef.on('channelMessageReceived', (evt) => {
      // received message is of the form - channel:membercount, add it to the state
      let {text} = evt;
      let data = text.split('///');
      showMessage(text);
      console.log("text :",text);
      console.log("data :",data);
    });

    rtmEngineRef.on('messageReceived', (evt) => {
      // received message is of the form - channel:membercount, add it to the state
      let {text} = evt;
      let data = text.split('///');
      showMessage(text);
      console.log("text :",text);
      console.log("data :",data);
    });

  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>
        Jashn Client
      </Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined && isHost ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>{isHost ? 'Join a channel' : ''}</Text>
        )}
        {isJoined && !isHost && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{ uid: remoteUid }} style={styles.videoView} />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>{isJoined && !isHost ? 'Waiting for a remote user to join' : ''}</Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );

  function showMessage(msg: string) {
    setMessage(msg);
  }
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { flex: 1, alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '90%', height: 200 },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20 },
  info: { backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff' }
});

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};

export default App;
