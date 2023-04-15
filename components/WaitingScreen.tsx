import { StyleSheet, Text } from "react-native";
import RulesScreen from "./RulesScreen ";
const myTopImage = require('../Assets/Images/waitWBG1.gif');


const WaitingText = () => (
    <RulesScreen topImg={myTopImage}/>
);

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        alignSelf: "center",
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingTop: "50%",
        fontSize: 20,
        color: "white",
        // width: '100%'
    },
})

export default WaitingText;
