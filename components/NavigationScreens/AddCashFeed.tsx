import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEditScreenNo, setInEditingMode } from '../../Actions/navigationActions';
import { RootState } from '../../States/types';

interface RadioButtonProps {
    title: string;
    image: any;
    isSelected: boolean;
    onPress: () => void;
}

const RadioButton = ({ title, image, isSelected, onPress }: RadioButtonProps) => (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
        <Image source={image} style={styles.radioImage} />
        <Text style={styles.radioTitle}>{title}</Text>
        <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]} />
    </TouchableOpacity>
);

const PaymentOptions = () => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const cashAmtForRecharge = useSelector((state: RootState) => state.navigationReducer.cashAmtForRecharge);
    const dispatch = useDispatch();

    useEffect(() => {
        const backAction = () => {
            // Call your function here
            dispatch(setInEditingMode(true));
            dispatch(setEditScreenNo(1));


            // Return 'true' to prevent the default back button behavior
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        // Clean up the event listener when the component is unmounted
        return () => backHandler.remove();
    }, []);


    const radioOptions = [
        { id: 1, title: 'Google Pay', image: require('../../Assets/Images/Main/upiIcons/gpay.png') },
        { id: 2, title: 'Phonepe', image: require('../../Assets/Images/Main/upiIcons/phonepe.png') },
        { id: 3, title: 'PayTM', image: require('../../Assets/Images/Main/upiIcons/paytm.png') },
        { id: 4, title: 'Amazon Pay', image: require('../../Assets/Images/Main/upiIcons/amazonPay.png') },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Payment Options</Text>
            <View style={styles.radioList}>
                {radioOptions.map(option => (
                    <RadioButton
                        key={option.id}
                        title={option.title}
                        image={option.image}
                        isSelected={selectedOption === option.id}
                        onPress={() => setSelectedOption(option.id)}
                    />
                ))}
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    justifyContent: 'space-between',
                    marginBottom: 10,
                }}>

                    <Text style={{
                        marginHorizontal: 15,
                        color: 'yellow',
                        fontSize: 25
                    }} >+</Text>
                    <Text style={{
                        flex: 1,
                        color: 'yellow',
                        fontSize: 20
                    }}>Add New Option</Text>


                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 18,
        color: 'white'
    },
    radioList: {
        backgroundColor: '#37363b',
        borderRadius: 10,
        padding: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomColor: '#424249',
        borderBottomWidth: 3,
    },
    radioImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: 'white'
    },
    radioTitle: {
        flex: 1,
        fontSize: 18,
        color: 'white'
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
    },
    radioCircleSelected: {
        backgroundColor: '#f82d87',
    },
});

export default PaymentOptions;
