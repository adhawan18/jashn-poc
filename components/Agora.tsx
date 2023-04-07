import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Switch, TouchableOpacity, Image, Dimensions } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { ClientRoleType, createAgoraRtcEngine, IRtcEngine, RtcSurfaceView, ChannelProfileType } from 'react-native-agora';
import RtmEngine from 'agora-react-native-rtm';


const { height } = Dimensions.get('window');
const imageContainerHeight = 0.6 * height;
const quizContainerHeight = 0.4 * height;

const appId = '70e1a03bf90645718299160e0fb1b38e';
const channelName = 'test18';
const token = "00670e1a03bf90645718299160e0fb1b38eIADEnbBHBYI81PYGAcFTHpX/gzzOGmbX+P08KQWr27fm/gx+f9gAAAAAIgCnEk8FkvApZAQAAQAirShkAgAirShkAwAirShkBAAirShk";
const uid = parseInt(generateRandomNumber());

function generateRandomNumber(): string {
    let randomNumber: string = '';
    for (let i = 0; i < 10; i++) {
        randomNumber += Math.floor(Math.random() * 10).toString();
    }
    return randomNumber;
}

interface AgoraProps {
    joined: boolean;
}

const Agora = ({ joined }: AgoraProps) => {
    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const rtmEngineRef = new RtmEngine();
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [isHost, setIsHost] = useState(false); // Client role
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user

    const [questionRcvd, setQuestion] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [optionsRcvd, setOptions] = useState<string[]>([]);
    const [showingQuestion, setShowingQuestion] = useState(false);
    const [rightAnswer, setRightAnswer] = useState('');

    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [timeDifference, setTimeDifference] = useState<number | null>(null);


    const handleAnswerSelected = (answer: any) => {
        console.log(answer);
        setSelectedAnswer(answer);
        setShowingQuestion(false);
        if (rightAnswer == answer) {
            setEndTime(Date.now());
            // if (startTime && endTime) {
            //     setTimeDifference(endTime - startTime);
            // }
        } else {
            console.log("Wrong Answer");
        }
    };

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
        const response = await fetch('https://virtuelly-meta.herokuapp.com/rte/test18/publisher/uid/0/?expiry=3600');
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


    const leave = async () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            // showMessage('You left the channel');
            // await rtmEngineRef?.leaveChannel('demoChannel').catch((e) => console.log(e));
            await rtmEngineRef?.logout().catch((e) => console.log(e));;

        } catch (e) {
            console.log(e);
        }
    };

    const setupVideoSDKEngine = async () => {
        try {
            // use the helper function to get permissions
            if (Platform.OS === 'android') { await getPermission() };
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: (_connection, Uid) => {
                    // showMessage('Successfully joined the channel ' + channelName);
                    setIsJoined(true);
                },
                onUserJoined: (_connection, Uid) => {
                    // showMessage('Remote user joined with uid ' + Uid);
                    setRemoteUid(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    // showMessage('Remote user left the channel. uid: ' + Uid);
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
            let { text } = evt;
            let data = text.split('///');
            // showMessage(text);
            console.log("text :", text);
            console.log("data :", data);
            setQuestionAndAns(data);
        });

        rtmEngineRef.on('messageReceived', (evt) => {
            // received message is of the form - channel:membercount, add it to the state
            let { text } = evt;
            let data = text.split('///');
            // showMessage(text);
            console.log("text :", text);
            console.log("data :", data);
            setQuestionAndAns(data);
        });

    };

    useEffect(() => {
        // Initialize Agora engine when the app starts
        if (joined) {
            join();
            setupVideoSDKEngine();
            initRTM();
        }
        if (startTime && endTime) {
            setTimeDifference(endTime - startTime);
        }
        console.log(startTime, endTime, timeDifference);
        console.log("Right Answer: ", timeDifference);
    }, [joined, join, setupVideoSDKEngine, initRTM, endTime, startTime]);

    if (showingQuestion) {
        return (
            <SafeAreaView style={styles.middle}>
                <View style={styles.imageContainer}>
                    <View style={styles.scroll}>
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
                                <RtcSurfaceView canvas={{ uid: remoteUid }} style={styles.videoView} />
                                {/* <Text>Remote user uid: {remoteUid}</Text> */}
                            </React.Fragment>
                        ) : (
                            <Text>{isJoined && !isHost ? 'Waiting for a remote user to join' : ''}</Text>
                        )}
                    </View>
                    {/* <Text style={styles.info}>{message}</Text> */}
                </View>

                <View style={styles.quizContainer}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>Q.{questionRcvd}</Text>
                    </View>
                    <View style={styles.answerContainer}>
                        <TouchableOpacity
                            style={[
                                styles.answerButton,
                                selectedAnswer === 'A' ? styles.selectedButton : null,
                            ]}
                            onPress={() => handleAnswerSelected(optionsRcvd[0])}>
                            <Text style={styles.answerText}>A. {optionsRcvd[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.answerButton,
                                selectedAnswer === 'B' ? styles.selectedButton : null,
                            ]}
                            onPress={() => handleAnswerSelected(optionsRcvd[1])}>
                            <Text style={styles.answerText}>B. {optionsRcvd[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.answerButton,
                                selectedAnswer === 'C' ? styles.selectedButton : null,
                            ]}
                            onPress={() => handleAnswerSelected(optionsRcvd[2])}>
                            <Text style={styles.answerText}>C. {optionsRcvd[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.answerButton,
                                selectedAnswer === 'D' ? styles.selectedButton : null,
                            ]}
                            onPress={() => handleAnswerSelected(optionsRcvd[3])}>
                            <Text style={styles.answerText}>D. {optionsRcvd[3]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <View style={styles.middle}>
                <View style={styles.imageContainer}>
                    <View style={styles.scroll}>
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
                                <RtcSurfaceView canvas={{ uid: remoteUid }} style={styles.videoView} />
                                {/* <Text>Remote user uid: {remoteUid}</Text> */}
                            </React.Fragment>
                        ) : (
                            <Text>{isJoined && !isHost ? 'Waiting for a remote user to join' : ''}</Text>
                        )}
                    </View>
                    {/* <Text style={styles.info}>{message}</Text> */}
                </View>
            </View>


        );
    }

    // function showMessage(msg: string) {
    //     setMessage(msg);
    // }
    function setQuestionAndAns(data: any) {
        setQuestion(data[0] + ' ' + data[1]);
        let tempArr = [];
        tempArr.push(data[2]);
        tempArr.push(data[3]);
        tempArr.push(data[4]);
        tempArr.push(data[5]);
        setOptions(tempArr);
        setShowingQuestion(true);
        setRightAnswer(data[6]);
        setStartTime(Date.now());
    }
};

const styles = StyleSheet.create({
    // button: {
    //     paddingHorizontal: 25,
    //     paddingVertical: 4,
    //     fontWeight: 'bold',
    //     color: '#ffffff',
    //     backgroundColor: '#0055cc',
    //     margin: 5,
    // },
    // main: {
    //     flex: 1,
    //     alignItems: 'center'
    // },
    scroll: {
        flex: 1,
        backgroundColor: 'lightgreen',
        // width: '100%'
    },
    // videoView: {
    //     backgroundColor: 'blue',
    //     width: 700,
    //     height: 700,
    //     // flex:1,
    // },
    videoView: {
        width: '100%',
        aspectRatio: 9 / 16,
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    head: {
        fontSize: 20
    },
    info: {
        backgroundColor: '#ffffe0',
        paddingHorizontal: 8,
        color: '#0000ff'
    },

    middle: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'yellow',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'silver'
    },
    middleImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    quizContainer: {
        flex: 1,
        backgroundColor: 'rgba(80, 80, 80, 0.3)',
        paddingHorizontal: '10%',
        paddingTop: '8%',
        borderRadius: 30
    },
    questionContainer: {
        marginBottom: 16,
        alignSelf: 'stretch',
    },
    questionText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    answerContainer: {
        flexDirection: 'column',
    },
    answerButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    selectedButton: {
        backgroundColor: '#ccc',
    },
    answerText: {
        fontSize: 18,
    },
});

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};
export default Agora;