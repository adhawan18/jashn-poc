import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.prefixContainer}>
        <Text style={styles.prefixText}>+91 </Text>
        {/* Indian Flag Emoji */}
        <Text style={styles.flagEmoji}>🇮🇳</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flagEmoji: {
    fontSize: 24,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PhoneNumber;