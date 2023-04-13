import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { RtcSurfaceView } from "react-native-agora";
import LinearGradient from "react-native-linear-gradient";
import ProgressCircle from "./ProgressTimer";

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

interface QuizScreenProps {
    progress: any,
    questionScreenType: any,
    questionRcvd: any,
    optionsRcvd: any,
    selectedAnswer: any,
    handleAnswerSelected: any,
    remoteUid :any,
    selectedButton:any,
}

const QuizScreen = ({
    progress,
    questionScreenType,
    questionRcvd,
    optionsRcvd,
    selectedAnswer,
    handleAnswerSelected,
    remoteUid,
    selectedButton,
}: QuizScreenProps) => (
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

export default QuizScreen;