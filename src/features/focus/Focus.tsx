import React from 'react';
import { useState } from 'react';
import { SafeAreaView, 
         View, Text, StyleSheet, 
         TextInput, Button } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes, spacing, colors } from '../../utils/sizes';

export const Focus = ({ addSubject }) => {

    const [subject, setSubject] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>What would you like to focus on?</Text>
                <View style={styles.flexContainer}>
                    <View style={styles.inputContainer}>
                    <TextInput onSubmitEditing={
                        ({nativeEvent}) => {
                        addSubject(nativeEvent.text);
                        }}/>
                    </View>
                    <RoundedButton size={50} title = "+"
                    onPress={() => {addSubject(subject)}} /> 
                </View>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.xxxl,    
    },
    titleContainer: {
        flex: 0.5,
        padding: paddingSizes.md,
        justifyContent: 'center',
    },
    title: {
        color: colors.white,
        fontSize: fontSizes.lg,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: colors.white,
        flex: 1,
        marginTop: spacing.lg,
        borderRadius: spacing.sm,
        marginRight: spacing.lg,
        alignItems: 'center'
    }
});
