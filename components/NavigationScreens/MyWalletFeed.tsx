import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { setEditScreenNo, setFooterItem, setInEditingMode } from '../../Actions/navigationActions';
const MyWallet = () => {
    const [enteredAmount, setEnteredAmount] = useState('');
    const dispatch= useDispatch();

    useEffect(() => {
        const backAction = () => {
            // Call your function here
            dispatch(setInEditingMode(false));
            dispatch(setFooterItem(1));


            // Return 'true' to prevent the default back button behavior
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        // Clean up the event listener when the component is unmounted
        return () => backHandler.remove();
    }, []);

    function addCash(cash :any){
        console.log(cash);
        dispatch(setInEditingMode(true));
        dispatch(setEditScreenNo(2));
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <View style={styles.opDiv}>
                <View style={styles.balanceDispDiv}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Balance</Text>
                    <Text style={{ color: 'white', fontSize: 30 }}>₹ 100</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>

                    <View style={styles.preAmountDiv}>
                        <TouchableOpacity style={styles.preAmountBtn} onPress={() => addCash('20')}>
                            <Text style={styles.innerBtnText}>₹ 20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.preAmountBtn} onPress={() => addCash('50')}>
                            <Text style={styles.innerBtnText}>₹ 50</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>
                        Or
                    </Text>
                    <TextInput
                        style={styles.amtIp}
                        keyboardType="numeric"
                        placeholder="Enter amount"
                        placeholderTextColor="white"
                        value={enteredAmount}
                        onChangeText={setEnteredAmount}
                    // maxLength={25}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center', alignSelf: 'center', }}>
                        <TouchableOpacity style={styles.addCashBtn} onPress={() => addCash(enteredAmount)}>
                            <Text style={styles.innerBtnText}>Add Cash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.withdrawBtn} >
                            <Text style={styles.innerBtnText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: 10, }}>
                <Text style={{ color: 'white', fontSize: 15 }}>Previous Winnings</Text>
                <Text style={{ color: 'white', fontSize: 20 }}>₹ 90</Text>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20
    },
    opDiv: {
        height: '60%',
        flexDirection: 'column',
        backgroundColor: '#36363d',
        borderRadius: 20,
        marginVertical: 20,
    },
    balanceDispDiv: {
        height: '30%',
        flexDirection: 'column',
        borderBottomColor: '#424249',
        borderBottomWidth: 3,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    preAmountDiv: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    preAmountBtn: {
        backgroundColor: '#86868a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amtIp: {
        padding: 10,
        backgroundColor: '#2b2a2f',
        borderRadius: 10,
        width: '90%',
        marginTop: 30,
        alignSelf: 'center',
        color: 'white'
    },
    addCashBtn: {
        backgroundColor: '#31be01',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    withdrawBtn: {
        backgroundColor: '#f82d87',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default MyWallet;