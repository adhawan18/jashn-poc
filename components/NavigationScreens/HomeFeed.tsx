import React from 'react';
import { Touchable } from 'react-native';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setEditScreenNo, setInEditingMode } from '../../Actions/navigationActions';

const HomeFeed = () => {
    const dispatch = useDispatch()

    function nothing() {
        console.log("Nothing");
    }

    function moveToRewardPage() {
        dispatch(setInEditingMode(true));
        dispatch(setEditScreenNo(3));
    }

    const renderItem = (imageSrc: any, title: any, description: any, functionOnPress: any) => (
        <TouchableOpacity style={styles.item} onPress={functionOnPress}>
            <Image source={imageSrc} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'column', backgroundColor: '#36363c', borderRadius: 10, padding: 10, marginVertical: 20, }}>
                <Image source={require('../../Assets/Images/Main/newEvent.png')} style={{ width: '100%', resizeMode: 'contain', }} />
                <Text style={{ flexDirection: 'column', color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    Game Start in 2 Days
                </Text>
                <Text style={{ flexDirection: 'column', color: '#cfcfd0', fontSize: 14 }}>
                    Solve word puzzle for cash prizes on
                </Text>
                <Text style={{ flexDirection: 'column', color: '#cfcfd0', fontSize: 14 }}>
                    Thursday 10 AM FOR ₹400K.
                </Text>
            </View>

            <View style={{ flexDirection: 'column', borderRadius: 10, padding: 10, marginVertical: 20, }}>
                <Text style={{ flexDirection: 'column', color: 'white', fontSize: 20 }}>
                    Join Contests
                </Text>
                <View style={styles.container2}>
                    <View style={styles.row}>
                        {renderItem(require('../../Assets/Images/Main/mainFeed1.png'), 'Play In Contest', 'Win ₹100K', nothing)}
                        {renderItem(require('../../Assets/Images/Main/mainFeed2.png'), 'Get ₹100 now', 'Invite 10 friends..', moveToRewardPage)}
                    </View>
                    <View style={styles.row}>
                        {renderItem(require('../../Assets/Images/Main/mainFeed3.png'), 'Past Winners', '', nothing)}
                        {renderItem(require('../../Assets/Images/Main/mainFeed4.png'), 'Upcoming Shows', '', nothing)}
                    </View>
                </View>
            </View>

            {/* <View style={{ flexDirection: 'column', backgroundColor: '#36363c', borderRadius: 10, padding: 10, marginVertical: 20, }}>
  <Image source={require('../../Assets/Images/Main/demoEvent.png')} style={{ width: '100%', resizeMode: 'contain', backgroundColor: 'blue' }} />
  <Text style={{ flexDirection: 'column', color: 'white', fontSize: 18 }}>
    Game Start in 2 Days
  </Text>
  <Text style={{ flexDirection: 'column', color: '#cfcfd0', fontSize: 14 }}>
    Solve word puzzle for cash prizes on
  </Text>
  <Text style={{ flexDirection: 'column', color: '#cfcfd0', fontSize: 14 }}>
    Thursday 10 AM FOR ₹400K.
  </Text>
</View> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    item: {
        backgroundColor: '#36363c',
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 10,
        width: '49%',
        height: 70,
        alignItems: 'center', 
        justifyContent:'space-between',
        borderRadius: 10,
    },
    image: {
        height: '100%',
        resizeMode: 'contain',
        marginLeft:-30
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    description: {
        color: '#cfcfd0',
        fontSize: 10,
        flexWrap: 'wrap',
    },
});

export default HomeFeed;