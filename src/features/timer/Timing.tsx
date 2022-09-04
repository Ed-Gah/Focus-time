import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

const Timing = (changeTime) => {
    return (
        <>
            <View style={styles.timingButton}>
                <Button title="10" onPress={() => changeTime(10)}/> 
            </View>
            <View style={styles.timingButton}>
                <Button title="15" onPress={() => changeTime(15)}/> 
            </View>
            <View style={styles.timingButton}>
                <Button title="20" onPress={() => changeTime(20)}/> 
            </View>
        </>
    );
};

export default Timing;

const styles = StyleSheet.create({
    timingButton: {
        flex: 1,
        alignItems: 'center',
    }
});