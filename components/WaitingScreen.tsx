import { StyleSheet, Text } from "react-native";

const WaitingText = () => (
    <Text
        style={styles.centerText}>
        Game has not yet started.{"\n"} Wait for the fun to begin !
    </Text>
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
