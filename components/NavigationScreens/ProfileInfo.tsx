import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileInformation = () => {
    const handleLogout = () => {
        // Your logout logic goes here
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{ uri: 'https://i.ibb.co/MNfm0vK/jeet-Avtar.jpg' }}
            />
            <Text style={styles.name}>Jeet</Text>
            <Text style={styles.phoneNumber}>+91 1234567890</Text>
            {/* <Text style={styles.email}>jeet@example.com</Text> */}

            <View style={styles.accountInfoContainer}>
                <Text style={styles.accountInfoHeader}>Account Information</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>jeet@example.com</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>Mumbai, India</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Age</Text>
                    <Text style={styles.infoValue}>24</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Settings</Text>
                    <Text style={styles.infoValue}>Some info about the user</Text>
                </View>
                <View style={styles.lastInfoRow}>
                    <Text style={styles.infoLabel}>Languages</Text>
                    <Text style={styles.infoValue}>English</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    email: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white'
    },
    phoneNumber: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white'
    },
    accountInfoContainer: {
        backgroundColor: '#36363c',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    accountInfoHeader: {
        fontSize: 12,
        marginBottom: 15,
        color: 'white'
    },
    infoRow: {
        flexDirection: 'row',
        color: 'white',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:10,
        borderBottomColor: '#424249',
        borderBottomWidth: 3,
    },
    lastInfoRow: {
        flexDirection: 'row',
        color: 'white',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:10,
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 5,
        color: 'white'
    },
    infoValue: {
        color: 'white'
    },
    logoutButton: {
        backgroundColor: '#ff0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    logoutText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default ProfileInformation;
