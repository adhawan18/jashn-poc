import React, { useRef, useState, useEffect, useCallback, Dispatch } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Switch, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { ClientRoleType, createAgoraRtcEngine, IRtcEngine, RtcSurfaceView, ChannelProfileType } from 'react-native-agora';
import RtmEngine from 'agora-react-native-rtm';
import LinearGradient from 'react-native-linear-gradient';
import Leaderboard from './Leaderboard';
import { ScrollView } from 'react-native-gesture-handler';
import WaitingText from './WaitingScreen';
import QuizScreen from './QuizScreen';
import { RootState } from '../States/types';
// reducers/gameReducer.ts
import {
    setIsJoined,
    setQuestionRcvd,
    setSelectedAnswer,
    setOptionsRcvd,
    setShowingQuestion,
    setRightAnswer,
    setAnsweredRight,
    setHaveAnswered,
    setCurrentScore,
    setCorrectInARow,
    setWrongInARow,
    setSelectedButton,
    setQuestionScreenType,
    setMarkAnswers,
    setStartTime,
    setEndTime,
    setTimeDifference,
    setProgress,
    setShowLeaderboard,
    setInSpotlight,
    setWritingChat,
    setChatArr,
    incrementProgress,
    incrementChatId,
    updateChatArr,

} from '../Actions/gameActions';
import { setIsHost, setRemoteUid, setChannelMembers } from '../Actions/agoraActions';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import WavyImage from './WavyHearts';


const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const appId = '70e1a03bf90645718299160e0fb1b38e';
const channelName = 'test';
const rtmChannel = 'demoChannel';
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

    const images = [
        require('../Assets/Images/Main/coin.png'),
    ];

    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const rtmEngineRef = new RtmEngine();
    const dispatch = useDispatch();

    const isHost = useSelector((state: RootState) => state.agoraReducer.isHost);
    const remoteUid = useSelector((state: RootState) => state.agoraReducer.remoteUid);
    const channelMembers = useSelector((state: RootState) => state.agoraReducer.channelMembers);

    const isJoined = useSelector((state: RootState) => state.mainGameReducer.isJoined);
    const questionRcvd = useSelector((state: RootState) => state.mainGameReducer.questionRcvd);
    const selectedAnswer = useSelector((state: RootState) => state.mainGameReducer.selectedAnswer);
    const optionsRcvd = useSelector((state: RootState) => state.mainGameReducer.optionsRcvd);
    const showingQuestion = useSelector((state: RootState) => state.mainGameReducer.showingQuestion);
    const rightAnswer = useSelector((state: RootState) => state.mainGameReducer.rightAnswer);
    const answeredRight = useSelector((state: RootState) => state.mainGameReducer.answeredRight);
    const haveAnswered = useSelector((state: RootState) => state.mainGameReducer.haveAnswered);
    const selectedButton = useSelector((state: RootState) => state.mainGameReducer.selectedButton);
    const questionScreenType = useSelector((state: RootState) => state.mainGameReducer.questionScreenType);
    const markAnswers = useSelector((state: RootState) => state.mainGameReducer.markAnswers);
    const currentScore = useSelector((state: RootState) => state.mainGameReducer.currentScore);
    const correctInARow = useSelector((state: RootState) => state.mainGameReducer.correctInARow);
    const wrongInARow = useSelector((state: RootState) => state.mainGameReducer.wrongInARow);
    const startTime = useSelector((state: RootState) => state.mainGameReducer.startTime);
    const endTime = useSelector((state: RootState) => state.mainGameReducer.endTime);
    const timeDifference = useSelector((state: RootState) => state.mainGameReducer.timeDifference);
    const progress = useSelector((state: RootState) => state.mainGameReducer.progress);
    const showLeaderboard = useSelector((state: RootState) => state.mainGameReducer.showLeaderboard);
    const inSpotlight = useSelector((state: RootState) => state.mainGameReducer.inSpotlight);
    const writingChat = useSelector((state: RootState) => state.mainGameReducer.writingChat);

    const chatArr = useSelector((state: RootState) => state.mainGameReducer.chatArr);
    const nextChatId = useSelector((state: RootState) => state.mainGameReducer.nextChatId);

    const [chatInput, setChatInput] = useState('');

    const scrollViewRef = useRef<ScrollView>(null);
    const chatArrRef = useRef(chatArr);
    const nextChatIdRef = useRef(nextChatId);
    const questionScreenTypeRef = useRef(questionScreenType);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    useEffect(() => {
        chatArrRef.current = chatArr;
    }, [chatArr]);

    useEffect(() => {
        nextChatIdRef.current = nextChatId;
    }, [nextChatId]);

    useEffect(() => {
        questionScreenTypeRef.current = questionScreenType;
    }, [questionScreenType]);




    const handleChatPress = () => {
        pushChatArr(["Jeet", "https://i.ibb.co/MNfm0vK/jeet-Avtar.jpg", chatInput]);
        setChatInput('');
        dispatch(setWritingChat(false));
        let tempStr = "chat///Jeet///https://i.ibb.co/MNfm0vK/jeet-Avtar.jpg///" + chatInput;
        rtmEngineRef.sendMessageByChannelId(rtmChannel, tempStr)
            .then(() => {
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.log('Error sending message: ', error);
            });

    };
    const pushChatArr = (data: any) => {
        let tempMsgEle = {
            id: nextChatIdRef.current,
            name: data[0],
            avatar: data[1],
            msg: data[2]
        };
        dispatch(updateChatArr(tempMsgEle));
        dispatch(incrementChatId());
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };


    const handleChannelMessageReceived = useCallback((evt: any, pushChatArrFunc: any, setQuestionAndAnsFunc: any) => {
        // received message is of the form - channel:membercount, add it to the state
        let { text } = evt;
        if (text == "show-leaderBoard") {
            console.log("text :", text);
            dispatch(setShowLeaderboard(true));
        }
        else if (text == "hide-leaderBoard") {
            console.log("text :", text);
            dispatch(setShowLeaderboard(false));
        }
        else if (text == "bring-spotlight") {
            console.log("text :", text);
            setClientRole('host');
            dispatch(setInSpotlight(true));
        }
        else if (text == "hide-spotlight") {
            console.log("text :", text);
            setClientRole('audience');
            dispatch(setInSpotlight(false));
        } else {
            let data = text.split('///');
            // showMessage(text);
            // console.log("text :", text);
            // console.log("data :", data);
            if (data[0] == 'question') {
                data.shift();
                // console.log("data :", data);
                setQuestionAndAnsFunc(data);
            } else if (data[0] == 'chat') {
                data.shift();
                pushChatArrFunc(data);
            } else if (data[0] == 'count') {
                // console.log("count", data);
                if (data[1] >= 1000) {
                    dispatch(setChannelMembers(((data[1] / 1000).toFixed(1) + "K")));
                } else {
                    dispatch(setChannelMembers(data[1]));
                }
            }
            else {
                // console.log("text :", text);
                console.log("Unknown message send");
            }
        }
    }, []);



    const openChatScreen = () => {
        dispatch(setWritingChat(true));
    }
    const closeChatScreen = () => {
        dispatch(setWritingChat(false));
        setChatInput('');
    }

    useEffect(() => {
        if (timeDifference) {
            console.log("timeDifference", timeDifference, endTime, startTime);
            dispatch(setCurrentScore(currentScore + (10000 - timeDifference) / 100));
        }
    }, [timeDifference]);

    useEffect(() => {
        // console.log("progressForStopWatch", progress);
        if (haveAnswered) {
            if (rightAnswer !== '' && rightAnswer === selectedAnswer) {
                dispatch(setAnsweredRight(true));
                if (startTime && endTime) {
                    dispatch(setTimeDifference(endTime - startTime));
                    dispatch(setCorrectInARow(correctInARow + 1));
                    dispatch(setWrongInARow(0));
                    if (correctInARow == 5) {
                        dispatch(setCurrentScore(currentScore + 10));
                        dispatch(setCorrectInARow(0));
                    }

                }
            } else {
                dispatch(setAnsweredRight(false));
                dispatch(setWrongInARow(wrongInARow + 1));
                dispatch(setCorrectInARow(0));
                if (wrongInARow == 5) {
                    dispatch(setCurrentScore(currentScore - 10));
                    dispatch(setWrongInARow(0));
                }
            }
            // console.log("haveAnswered", haveAnswered);
            // console.log("answeredRight", answeredRight);
            // console.log("score", currentScore);
        }
    }, [haveAnswered]);

    const handleAnswerSelected = (answer: any) => {
        console.log("progressForStopWatch1", progress);
        console.log("questionScreenType3", questionScreenType);
        if (haveAnswered)
            return;
        dispatch(setSelectedAnswer(answer));
        dispatch(setHaveAnswered(true));
        dispatch(setEndTime(Date.now()));
    };

    const startTimer = () => {
        console.log("questionScreenType4", questionScreenType);
        setTimeout(() => incTimer(progress, dispatch), 1000);
    }

    const incTimer = (currentProgress: number, dispatch: Dispatch<AnyAction>) => {
        console.log("questionScreenType5", questionScreenType);
        if (currentProgress < 10) {
            dispatch(incrementProgress());
            setTimeout(() => incTimer(currentProgress + 1, dispatch), 1000);
        }
    };

    const answerMarking = useCallback(() => {
        console.log("haveAnswered", haveAnswered);
        console.log("answeredRight", answeredRight);
        console.log("questionScreenType2", questionScreenType);
        if (haveAnswered) {
            if (answeredRight) {
                dispatch(setQuestionScreenType(1));
                dispatch(setSelectedButton({ backgroundColor: '#00a912', }));
                console.log("Answer check: Answered Right");
            } else {
                dispatch(setQuestionScreenType(2));
                dispatch(setSelectedButton({ backgroundColor: '#f44336', }));
                console.log("Answer check: Answered Wrong");
            }
        } else {
            // console.log(dispatch(setSelectedAnswer(answer));
            dispatch(setQuestionScreenType(2));
            console.log("Answer check: Didnt Answered");
        }
        // console.log("questionScreenType3", questionScreenType);
    }, [haveAnswered, answeredRight, questionScreenType]);

    useEffect(() => {
        if (markAnswers) {
            answerMarking();
        }
    }, [markAnswers, answerMarking]);

    useEffect(() => {
        if (questionRcvd && optionsRcvd.length > 0) {
            handleQuestionInitialisation();
        }
    }, [questionRcvd, optionsRcvd]);



    const handleQuestionInitialisation = useCallback(() => {

        dispatch(setMarkAnswers(false));
        dispatch(setSelectedAnswer(''));
        dispatch(setQuestionScreenType(0));
        dispatch(setShowingQuestion(true));
        dispatch(setStartTime(Date.now()));
        dispatch(setAnsweredRight(false));
        dispatch(setHaveAnswered(false));
        dispatch(setSelectedButton({ backgroundColor: '#f82d87', }));
        console.log("questionScreenType1", questionScreenType);
        console.log("progressForStopWatch", progress);
        dispatch(setProgress(0));
        startTimer();

        setTimeout(() => {
            dispatch(setQuestionScreenType(4));
            dispatch(setHaveAnswered(true));
        }, 10000);

        setTimeout(() => {
            dispatch(setMarkAnswers(true));
        }, 15400);

        setTimeout(() => {
            dispatch(setShowingQuestion(false));
        }, 25000);
    }, [showingQuestion, markAnswers, questionScreenType, progress, selectedAnswer
        , showingQuestion
        , startTime
        , answeredRight
        , haveAnswered
        , selectedButton, startTimer]);

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
                dispatch(setIsJoined(true));
                agoraEngineRef.current?.joinChannel(fetchedToken, channelName, uid, {
                    clientRoleType: ClientRoleType.ClientRoleAudience
                });
                await rtmEngineRef.createClient(appId).catch((e) => console.log(e));
                let fetchedRtmToken = await FetchRtmToken(uid);
                await rtmEngineRef?.login({ uid: uid.toString(), token: fetchedRtmToken }).catch((e) => console.log(e));
                await rtmEngineRef?.joinChannel(rtmChannel).catch((e) => console.log(e));
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Fetches the <Vg k="VSDK" /> token
    const FetchToken = async (): Promise<string> => {
        const response = await fetch('https://virtuelly-meta.herokuapp.com/rte/' + channelName + '/publisher/uid/0/?expiry=3600');
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
            console.log("setClientRole", uid);
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
            dispatch(setRemoteUid(0));
            dispatch(setIsJoined(false));
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
                    dispatch(setIsJoined(true));
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
            dispatch(setRemoteUid(Uid));
        }
    }, [remoteUid]);
    const removePlayer = useCallback((Uid: any) => {
        console.log("offline", remoteUid, Uid);
        if (remoteUid == Uid) {
            dispatch(setRemoteUid(0));
        }
    }, [remoteUid]);

    const initRTM = useCallback(async () => {

        rtmEngineRef?.on('error', (evt) => {
            console.log(evt);
        });

        rtmEngineRef.on('channelMessageReceived', (evt) => {
            handleChannelMessageReceived(evt, pushChatArr, setQuestionAndAns);
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

    }, []);

    useEffect(() => {
        // Initialize Agora engine when the app starts
        async function setup() {
            if (joined) {
                await setupVideoSDKEngine();
                await join();
                await initRTM();
            }
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
        return <WaitingText />;
    } else {
        if (showingQuestion) {
            return (
                <QuizScreen
                    currentScore={currentScore}
                    progress={progress}
                    questionScreenType={questionScreenType}
                    questionRcvd={questionRcvd}
                    optionsRcvd={optionsRcvd}
                    selectedAnswer={selectedAnswer}
                    handleAnswerSelected={handleAnswerSelected}
                    remoteUid={remoteUid}
                    selectedButton={selectedButton}
                />
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
                            {inSpotlight ? (
                                <React.Fragment >
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <RtcSurfaceView canvas={{ uid: remoteUid.valueOf() }} style={{ flex: 1, }} />
                                        <RtcSurfaceView canvas={{ uid: 0 }} style={{ flex: 1, }} />
                                    </View>
                                </React.Fragment>

                            ) : (
                                <React.Fragment key={remoteUid.valueOf()}>
                                    <RtcSurfaceView canvas={{ uid: remoteUid.valueOf() }} style={styles.videoView} />
                                </React.Fragment>
                            )}
                        </View>
                        {/* {images.map((image, index) => (
                            <WavyImage source={require('../Assets/Images/sendBtn.png')} startPositionX={50} />
                        ))} */}
                    </View>

                    <LinearGradient style={styles.chatContainer} colors={['rgba(64, 45, 116, 0.1)', 'rgba(248,46,132, 0.2)']} start={{ x: 0.5, y: 0.5 }}>
                        <View style={{ flex: 1, position: 'relative' }}>
                            <ScrollView ref={scrollViewRef} style={{ flex: 1, paddingHorizontal: 10 }}>
                                {chatArr.map((chat) => (
                                    <View style={styles.chatMsgBox} key={chat.id}>
                                        <Image
                                            source={{ uri: chat.avatar }}
                                            style={styles.chatMsgAvtar}
                                        />
                                        <Text style={styles.chatMsgUserName}>{chat.name}</Text>
                                        <Text style={styles.chatMsgChat}>{chat.msg}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                            {/* <LinearGradient
                                colors={['rgba(100, 100, 100, 0.5)', 'rgba(100, 100, 100, 0)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    height: 50, // Adjust the height of the fading effect
                                }}
                            /> */}
                        </View>

                        {/* Button */}
                        {writingChat ? (
                            <View style={{ flex: 0.35, flexDirection: 'row' }}>
                                <TextInput
                                    style={{ flex: 1, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 30, marginHorizontal: 10, marginVertical: 5 }}
                                    value={chatInput}
                                    onChangeText={setChatInput}
                                    maxLength={25}
                                />
                                <Text
                                    style={{
                                        position: 'absolute',
                                        right: '10%',
                                        top: '100%',
                                        fontSize: 12, color: chatInput.length === 25 ? 'red' : '#888'
                                    }}>
                                    {chatInput.length}/25
                                </Text>
                                <TouchableOpacity onPress={handleChatPress} style={{
                                    position: 'absolute',
                                    right: '10%',
                                    top: '50%',
                                    transform: [{ translateY: -15 }]
                                }} >
                                    <Image
                                        source={require('../Assets/Images/sendBtn.png')}
                                        style={{
                                            backgroundColor: 'transparent',
                                            width: 30,
                                            height: 30,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    right: '8%',
                                    bottom: '110%',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: 50,
                                    padding: 10
                                }} >
                                    <Image
                                        source={require('../Assets/Images/dotsWhite.png')}
                                        style={{
                                            backgroundColor: 'transparent',
                                            width: 20,
                                            height: 20,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    right: '8%',
                                    bottom: '170%',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: 50,
                                    padding: 10
                                }}>
                                    <Image
                                        source={require('../Assets/Images/heartWhite.png')}
                                        style={{
                                            backgroundColor: 'transparent',
                                            width: 20,
                                            height: 20,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    right: '8%',
                                    bottom: '230%',
                                    backgroundColor: '#f82d87',
                                    borderRadius: 50,
                                    padding: 10
                                }} onPress={() => closeChatScreen()}>
                                    <Image
                                        source={require('../Assets/Images/crossWhite.png')}
                                        style={{
                                            backgroundColor: 'transparent',
                                            width: 20,
                                            height: 20,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </TouchableOpacity>

                            </View>

                        ) : (
                            <TouchableOpacity style={{
                                position: 'absolute',
                                right: '10%',
                                bottom: '10%'
                            }} onPress={() => openChatScreen()}>
                                <Image
                                    source={require('../Assets/Images/chatIcon.png')}
                                    style={{
                                        backgroundColor: 'transparent',
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </TouchableOpacity>

                        )}
                    </LinearGradient>

                </View >


            );
        }
    }


    // function showMessage(msg: string) {
    //     setMessage(msg);
    // }
    function setQuestionAndAns(data: any) {
        console.log("Got the question: ", data[1]);
        dispatch(setQuestionRcvd(data[1]));
        let tempArr = [];
        tempArr.push(data[2]);
        tempArr.push(data[3]);
        tempArr.push(data[4]);
        tempArr.push(data[5]);
        dispatch(setOptionsRcvd(tempArr));

        dispatch(setRightAnswer(data[6]));

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
    videoViewHalf: {
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
    chatContainer: {
        flex: 0.6,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingBottom: 20,
    },
    chatMsgBox: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    chatMsgUserName: {
        fontSize: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'rgb(180,180,180)',
        marginHorizontal: 5,
    },
    chatMsgAvtar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginHorizontal: 5,
    },
    chatMsgChat: {
        fontSize: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
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