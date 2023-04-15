import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Rules = [
    {
        id: 1,
        rule: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        id: 2,
        rule: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 3,
        rule: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        id: 4,
        rule: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
        id: 5,
        rule: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    },
    {
        id: 6,
        rule: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    },
    {
        id: 7,
        rule: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    },
    {
        id: 8,
        rule: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    },
    {
        id: 9,
        rule: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    },
    {
        id: 10,
        rule: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    },

];


interface RulesScreenProps {
    topImg: any;
}

const RulesScreen = ({ topImg }: RulesScreenProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.ImgContainer}>
                <Image
                    source={topImg}
                    style={styles.Img}
                />
            </View>
            <View style={styles.rulesContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 10, }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Rules</Text>
                </View>
                <ScrollView style={{ flex: 9 }}  showsVerticalScrollIndicator={false}>
                    {Rules.map((rule) => (
                        <View key={rule.id} style={styles.ruleItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{ color: '#fff', marginRight: 13, fontSize: 20 }}>
                                    {"\u2022"}
                                </Text>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        color: '#fff',
                                        fontSize: 15,
                                        flex: 1,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {rule.rule}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    ImgContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    Img: {
        width: '90%',
        height: 200,
        resizeMode: 'contain'
        // borderRadius: 50,
    },
    rulesContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'rgba(53, 53, 60,0.3)',
        paddingHorizontal: 20,
        marginHorizontal: 20,
        marginTop: 20,
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    ruleText: {
        // flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'space-around',
        // alignSelf: 'center',
        // textAlign: 'center',
        marginVertical: 10,
        flex: 1,
    },

});

export default RulesScreen;