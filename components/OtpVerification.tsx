import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const OtpVerificationWindow = () => {
    const [otp, setOtp] = useState('');
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);

    const handleOtpChange = (value: any, ref: any) => {
        setOtp((prevOtp) => {
            let newOtp = prevOtp;
            if (value) {
                newOtp += value;
                if (ref.current) {
                    ref.current.focus();
                }
            }
            return newOtp;
        });
    };

    const handleOtpDelete = (event: any, ref: any) => {
        if (event.nativeEvent.key === 'Backspace' && otp.length > 0) {
            setOtp((prevOtp) => {
                const newOtp = prevOtp.slice(0, -1);
                if (ref.current) {
                    ref.current.focus();
                }
                return newOtp;
            });
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                ref={inputRef1}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={otp[0]}
                onChangeText={(value) => handleOtpChange(value, inputRef2)}
                onKeyPress={(event) => handleOtpDelete(event, inputRef1)}
            />
            <TextInput
                ref={inputRef2}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={otp[1]}
                onChangeText={(value) => handleOtpChange(value, inputRef3)}
                onKeyPress={(event) => handleOtpDelete(event, inputRef1)}
            />
            <TextInput
                ref={inputRef3}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={otp[2]}
                onChangeText={(value) => handleOtpChange(value, inputRef4)}
                onKeyPress={(event) => handleOtpDelete(event, inputRef2)}
            /><Text style={{color:'white',fontSize:20}}> - </Text>
            <TextInput
                ref={inputRef4}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={otp[3]}
                onChangeText={(value) => handleOtpChange(value, inputRef5)}
                onKeyPress={(event) => handleOtpDelete(event, inputRef3)}
            />
            <TextInput
                ref={inputRef5}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={otp[4]}
                onChangeText={(value) => handleOtpChange(value, inputRef6)}
                onKeyPress={(event) => handleOtpDelete(event, inputRef4)}
            />
            <TextInput
                ref={inputRef6}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={otp[5]}
                onChangeText={(value) => handleOtpChange(value, inputRef6)}
                onKeyPress={(event) => handleOtpDelete(event, inputRef5)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    input: {
        marginHorizontal: 10,
        backgroundColor: 'white',
        paddingBottom: 5,
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 24,
    },
});

export default OtpVerificationWindow;