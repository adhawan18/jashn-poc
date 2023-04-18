import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RootState } from '../../States/types';
import { setFooterItem } from '../../Actions/navigationActions';
import { useDispatch, useSelector } from 'react-redux';

const Footer = () => {
    const dispatch = useDispatch();
    const footerItem = useSelector((state: RootState) => state.navigationReducer.footerItem);
    const items = [
        { id: 1, label: require('../../Assets/Images/Main/footer/home.png') },
        { id: 2, label: require('../../Assets/Images/Main/footer/gift.png') },
        { id: 3, label: require('../../Assets/Images/Main/footer/rule.png') },
        { id: 4, label: require('../../Assets/Images/Main/footer/trophy.png') },
        { id: 5, label: require('../../Assets/Images/Main/footer/user.png') },
    ];

    function setSelectedItem(id: any) {
        dispatch(setFooterItem(id));
    }

    const renderItem = (item: any) => {
        const isSelected = footerItem === item.id;

        return (
            <TouchableOpacity
                key={item.id}
                style={[styles.item, isSelected ? styles.itemSelected : {}]}
                onPress={() => setSelectedItem(item.id)}
            >
                <View style={isSelected ? styles.imgWrapperSelected : styles.imgWrapper}>
                    <Image style={isSelected ? styles.imgSelected : styles.img} source={item.label} />
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.footer}>
            <View style={styles.container}>{items.map(renderItem)}</View>
            {/* {footerItem && (
        <View style={[styles.cutout, { left: items.findIndex((item) => item.id == footerItem) * 25 + '%' }]} />
      )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black',
        // paddingVertical: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    item: {
        padding: 10,
    },
    itemSelected: {
        borderColor: '#f82d87',
        transform: [{ translateY: -20 }],
    },
    imgWrapper: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgWrapperSelected: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f82d87',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imgSelected: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },
    cutout: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '25%',
        height: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default Footer;


