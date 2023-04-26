import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { setFooterItem, setInEditingMode } from '../../Actions/navigationActions';
import { Share } from 'react-native';
import { API_URL } from '../Constants';

const MyRewards = () => {

    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        // Fetch the referral code from the API and update the state
    }, []);

    const shareReferralLink = async () => {
        try {
            const result = await Share.share({
                message: "Join our trivia app and use my referral code: ${referralCode}",
                url: "www.google.com"
            });
            if (result.action === Share.sharedAction) {
                console.log('Referral link shared successfully');
            } else if (result.action === Share.dismissedAction) {
                console.log('Referral link sharing dismissed');
            }
        } catch (error) {
            console.error('Error sharing referral link:', error);
        }
    };

    const dispatch = useDispatch();

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

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Rewards Club</Text>
            <LinearGradient style={styles.topDisp} colors={['rgb(246,78,48)', 'rgb(249, 29, 181)']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}>
                <View style={styles.topDispCoin}>
                    <Image
                        source={require('../../Assets/Images/Main/coin.png')}
                        style={{
                            backgroundColor: 'transparent',
                            width: 50,
                            height: 50,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View style={{ position: 'absolute', left: 120, flexDirection: 'column', marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 20, color: 'white', justifyContent: 'center', alignItems: 'center', }}>Next Reward</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                        <Text style={{ fontSize: 35, color: 'white', }}>0</Text>
                        <Text style={{ fontSize: 20, color: 'white' }}> /500</Text>
                    </View>
                </View>

            </LinearGradient>
            <Text style={{ fontSize: 20, color: 'white', marginTop: '10%' }}>My Rewards</Text>
            <View style={styles.disp2}>
                <Image
                    source={require('../../Assets/Images/Main/rewards1.png')}
                    style={{
                        backgroundColor: 'transparent',
                        width: '35%',
                        resizeMode: 'contain',
                        position: 'absolute',
                        right: 10
                    }}
                />
                <View style={{ position: 'absolute', left: 10, flexDirection: 'column', marginHorizontal: 10, width: '70%' }}>
                    <Text style={{ fontSize: 20, color: 'white', justifyContent: 'center', alignItems: 'center', }}>Invite 10 people and get rewards</Text>
                    <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', }}>Refer friends to get ₹10K</Text>
                    <TouchableOpacity style={{ backgroundColor: '#69696d', width: '50%', marginVertical: 10, borderRadius: 10, padding: 5, justifyContent: 'center', alignItems: 'center' }}
                        onPress={shareReferralLink}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Redeem</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.disp2}>
                <Image
                    source={require('../../Assets/Images/Main/rewards2.png')}
                    style={{
                        backgroundColor: 'transparent',
                        width: '35%',
                        resizeMode: 'contain',
                        position: 'absolute',
                        right: 10
                    }}
                />
                <View style={{ position: 'absolute', left: 10, flexDirection: 'column', marginHorizontal: 10, width: '65%' }}>
                    <Text style={{ fontSize: 20, color: 'white', justifyContent: 'center', alignItems: 'center', }}>Playing streak rewards</Text>
                    <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', }}>Get free lifeline when you play 3, 5 and..</Text>
                    <TouchableOpacity style={{ backgroundColor: '#69696d', width: '50%', marginVertical: 10, borderRadius: 10, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Redeem</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 18,
        color: 'white'
    },
    topDisp: {
        height: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        flexDirection: 'row'

    },
    topDispCoin: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        position: 'absolute',
        left: 15,
    },
    disp2: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: '#36363d',
        marginTop: '10%'

    },
});

export default MyRewards;
