import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Switch, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { ClientRoleType, createAgoraRtcEngine, IRtcEngine, RtcSurfaceView, ChannelProfileType } from 'react-native-agora';
import RtmEngine from 'agora-react-native-rtm';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from './ProgressTimer';
import Leaderboard from './Leaderboard';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const appId = '70e1a03bf90645718299160e0fb1b38e';
const channelName = 'test';
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
    const [answeredRight, setAnsweredRight] = useState(false);
    const [haveAnswered, setHaveAnswered] = useState(false);
    const [selectedButton, setSelectedButton] = useState({ backgroundColor: '#f82d87', });
    const [questionScreenType, setQuestionScreenType] = useState(0);
    //0 MEANS,QUES RECIEVED, 1 MEANS RIGHT ANSWER, 2 MEANS WRONG ANSWER, 3 DIDNT ANSWERRED, 4 TIMES UP 

    const [markAnswers, setMarkAnswers] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [timeDifference, setTimeDifference] = useState<number | null>(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [inSpotlight, setInSpotlight] = useState(false);

    const [progress, setProgressForStopWatch] = useState(0);

    const handleAnswerSelected = (answer: any) => {
        console.log("progressForStopWatch", progress);
        if (haveAnswered)
            return;
        setSelectedAnswer(answer);

        setHaveAnswered(true);
        setEndTime(Date.now());
        if (rightAnswer !== '' && rightAnswer === answer) {
            setAnsweredRight(true);
            if (startTime && endTime) {
                setTimeDifference(endTime - startTime);
            }
        } else {
            setAnsweredRight(false);
        }
        console.log("haveAnswered", haveAnswered);
        console.log("answeredRight", answeredRight);
    };


    const startTimer = () => {
        console.log("progressForStopWatch", progress);
        console.log("progress1 ", progress);
        setTimeout(incTimer, 1000);
    }

    function incTimer() {
        setProgressForStopWatch(prevProgress => {
            const newProgress = prevProgress + 1;

            if (newProgress < 10) {
                setTimeout(incTimer, 1000);
            }

            return newProgress;
        });

    }

    const answerMarking = useCallback(() => {
        console.log("haveAnswered", haveAnswered);
        console.log("answeredRight", answeredRight);
        console.log("questionScreenType Now", questionScreenType);
        if (haveAnswered) {
            if (answeredRight) {
                setQuestionScreenType(1);
                setSelectedButton({ backgroundColor: '#32bd01', });
                console.log("Answer check: Answered Right");
            } else {
                setQuestionScreenType(2);
                setSelectedButton({ backgroundColor: '#ec5632', });
                console.log("Answer check: Answered Wrong");
            }
        } else {
            setQuestionScreenType(3);
            console.log("Answer check: Didnt Answered");
        }
        // console.log("questionScreenType3", questionScreenType);
    }, [haveAnswered, answeredRight, questionScreenType]);

    useEffect(() => {
        if (markAnswers) {
            answerMarking();
        }
    }, [markAnswers, answerMarking]);


    function handleQuestionInitialisation() {
        setSelectedAnswer('');
        setQuestionScreenType(0);
        setShowingQuestion(true);
        setStartTime(Date.now());
        setAnsweredRight(false);
        setHaveAnswered(false);
        setSelectedButton({ backgroundColor: '#f82d87', });
        console.log("questionScreenType", questionScreenType);
        console.log("progressForStopWatch", progress);
        setProgressForStopWatch(0);
        startTimer();

        setTimeout(() => {
            setQuestionScreenType(4);
        }, 10000);

        setTimeout(() => {
            setMarkAnswers(true);
        }, 15400);

        setTimeout(() => {
            setShowingQuestion(false);
        }, 25000);
    }

    const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            await setupVideoSDKEngine();
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
        const response = await fetch('https://virtuelly-meta.herokuapp.com/rte/test/publisher/uid/0/?expiry=3600');
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

    const setClientRole = async (role: any) => {
        try {
            if (role == 'host') {
                await agoraEngineRef.current?.setClientRole(ClientRoleType.ClientRoleBroadcaster);
            } else {
                await agoraEngineRef.current?.setClientRole(ClientRoleType.ClientRoleAudience);
            }
            console.log(`Client role set to ${role}`);
        } catch (error) {
            console.log(`Error setting client role: ${error}`);
        }
    }


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

    // useEffect(() => {
    //     setupVideoSDKEngine();
    // }, [remoteUid]);
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
                    addPlayer(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    // showMessage('Remote user left the channel. uid: ' + Uid);
                    removePlayer(Uid);
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

    const addPlayer = useCallback((Uid: any) => {
        console.log("online", remoteUid, Uid);
        if (remoteUid === 0) {
            setRemoteUid(Uid);
        }
    }, [remoteUid]);
    const removePlayer = useCallback((Uid: any) => {
        console.log("offline", remoteUid, Uid);
        if (remoteUid == Uid) {
            setRemoteUid(0);
        }
    }, [remoteUid]);

    const initRTM = async () => {

        rtmEngineRef?.on('error', (evt) => {
            console.log(evt);
        });

        rtmEngineRef.on('channelMessageReceived', (evt) => {
            // received message is of the form - channel:membercount, add it to the state
            let { text } = evt;
            if (text == "show-leaderBoard") {
                console.log("text :", text);
                setShowLeaderboard(true);
            }
            else if (text == "hide-leaderBoard") {
                console.log("text :", text);
                setShowLeaderboard(false);
            }
            else if (text == "bring-spotlight") {
                console.log("text :", text);
                setClientRole('host');
                setInSpotlight(true);
            }
            else if (text == "hide-spotlight") {
                console.log("text :", text);
                setClientRole('audience');
                setInSpotlight(false);
            } else {
                let data = text.split('///');
                // showMessage(text);
                console.log("text :", text);
                console.log("data :", data);
                setQuestionAndAns(data);
            }
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
        async function setup() {
            if (joined) {
                await setupVideoSDKEngine();
                await join();
                await initRTM();
                console.log("Aasihsh");
            }
            console.log("Aasihsh1");
        }
        setup();
        // if (startTime && endTime) {
        //     setTimeDifference(endTime - startTime);
        // }
        // console.log(startTime, endTime, timeDifference);
        // console.log("Right Answer: ", timeDifference);
        console.log("Aasihsh1");
    }, [joined]);

    // useEffect(() => {
    // Initialize Agora engine when the app starts

    // if (startTime && endTime) {
    //     setTimeDifference(endTime - startTime);
    // }
    // console.log(startTime, endTime, timeDifference);
    // console.log("Right Answer: ", timeDifference);

    // }, [endTime, startTime]);
    if (showLeaderboard) {
        return (
            <Leaderboard />
        );
    }

    if (!isJoined || isHost || remoteUid == 0) {
        return (
            <Text style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                alignSelf: 'center',
                flexDirection: 'column',
                paddingHorizontal: 20,
                paddingTop: '50%',
                fontSize: 20,
                color: 'white'
            }}>Game has not yet started.{"\n"} Wait for the fun to begin !</Text>

        );
    } else {
        if (showingQuestion) {
            return (
                <SafeAreaView style={styles.middle}>
                    <View style={styles.imageContainer}>
                        <View style={styles.scroll}>
                            <React.Fragment key={remoteUid}>
                                <RtcSurfaceView canvas={{ uid: remoteUid }} style={styles.videoView} />
                            </React.Fragment>
                        </View>
                    </View>


                    <LinearGradient style={styles.quizContainer} colors={['rgba(20, 20, 20, 0.1)', 'rgba(20, 20, 20, 1)']} start={{ x: 0.5, y: 0.1 }}>
                        <View style={styles.circleContainer}>
                            <ProgressCircle progress={progress} screen={questionScreenType} />
                        </View>
                        <View style={styles.questionContainer}>
                            <Text style={styles.questionText}>{questionRcvd}</Text>
                            {/* <Text style={styles.questionText}>Which of the following is national bird of India</Text> */}
                        </View>
                        <View style={styles.answerContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.answerButton,
                                    selectedAnswer == optionsRcvd[0] ? selectedButton : null,
                                ]}
                                onPress={() => handleAnswerSelected(optionsRcvd[0])}>
                                <Text style={styles.answerText}>{optionsRcvd[0]}</Text>
                                {/* <Text style={styles.answerText}>Parrot</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.answerButton,
                                    selectedAnswer == optionsRcvd[1] ? selectedButton : null,
                                ]}
                                onPress={() => handleAnswerSelected(optionsRcvd[1])}>
                                <Text style={styles.answerText}>{optionsRcvd[1]}</Text>
                                {/* <Text style={styles.answerText}>Sparrow</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.answerButton,
                                    selectedAnswer == optionsRcvd[2] ? selectedButton : null,
                                ]}
                                onPress={() => handleAnswerSelected(optionsRcvd[2])}>
                                <Text style={styles.answerText}>{optionsRcvd[2]}</Text>
                                {/* <Text style={styles.answerText}>Hen</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.answerButton,
                                    selectedAnswer == optionsRcvd[3] ? selectedButton : null,
                                ]}
                                onPress={() => handleAnswerSelected(optionsRcvd[3])}>
                                <Text style={styles.answerText}>{optionsRcvd[3]}</Text>
                                {/* <Text style={styles.answerText}>Peacock</Text> */}
                            </TouchableOpacity>

                        </View>
                        {/* Footer */}
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.footerButton}>
                                <Image
                                    source={require('../Assets/Images/5050.png')}
                                    style={styles.footerButtonImg}
                                />
                            </TouchableOpacity>
                            {/* <LinearGradient colors={['#f820ab', '#f6493']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} > */}
                            <TouchableOpacity style={styles.footerButton}>
                                <Image
                                    source={require('../Assets/Images/audiencePoll.png')}
                                    style={styles.footerButtonImg}
                                />
                            </TouchableOpacity >

                            <TouchableOpacity style={styles.footerButton}>
                                <Image
                                    source={require('../Assets/Images/bestOf2.png')}
                                    style={styles.footerButtonImg}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.footerButton}>
                                <Image
                                    source={require('../Assets/Images/heartLine.png')}
                                    style={styles.footerButtonImg}
                                />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            );
        } else {
            return (

                //             {isJoined && !isHost && remoteUid !== 0 ? (
                //                 <React.Fragment key={remoteUid}>
                //                     <RtcSurfaceView canvas={{ uid: remoteUid }} style={styles.videoView} />
                //                     {/* <Text>Remote user uid: {remoteUid}</Text> */}
                //                 </React.Fragment>
                //             ) : (
                //                 <Text>{isJoined && !isHost ? 'Waiting for a remote user to join' : ''}</Text>
                //             )}

                <View style={styles.middle}>
                    <View style={styles.imageContainer}>
                        <View style={styles.scroll}>
                            <React.Fragment key={remoteUid}>
                                <RtcSurfaceView canvas={{ uid: remoteUid }} style={styles.videoView} />
                            </React.Fragment>
                        </View>
                    </View>
                </View>
            );
        }
    }


    // function showMessage(msg: string) {
    //     setMessage(msg);
    // }
    function setQuestionAndAns(data: any) {
        console.log("Got the question: ", data[1]);
        setQuestion(data[1]);
        let tempArr = [];
        tempArr.push(data[2]);
        tempArr.push(data[3]);
        tempArr.push(data[4]);
        tempArr.push(data[5]);
        setOptions(tempArr);

        setRightAnswer(data[6]);

        handleQuestionInitialisation();

        // const timer = setInterval(() => {
        //     setProgress(prevProgress => prevProgress + 1);
        // }, 1000);
    }
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: 'lightgreen',
        // width: '100%'
    },
    videoView: {
        width: '100%',
        aspectRatio: aspectRatio,
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
        flex: 1.7,
        backgroundColor: 'rgba(80, 80, 80, 0.3)',
        paddingHorizontal: '10%',
        paddingTop: '20%',
        borderRadius: 30
    },
    questionContainer: {
        marginBottom: 16,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionText: {
        fontSize: 28,
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
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
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
    },
    answerText: {
        fontSize: 18,
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white'
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
        padding: 20,
        borderRadius: 50,
        backgroundColor: '#f82d87',
    },
    footerButtonImg: {
        backgroundColor: 'transparent',
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    circleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: [{ translateY: -50 }],
    },
    circle: {
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }

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