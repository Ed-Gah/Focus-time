import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform, Button } from 'react-native';
import { colors, spacing } from '../../utils/sizes';
import Countdown from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import Timing from './Timing';

const DEFAULT_TIME = 0.1
export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {  
    const interval = React.useRef(null);
    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(true);
    const [progress, setProgress] = useState(1);

    const onProgress = (progress) => {
        setProgress(progress)
    };

    const vibration = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000);
        } else {
            Vibration.vibrate(10000);
        }
    }

    const changeTime = (min) => {
        setMinutes(min);
        setProgress(1); 
        setIsStarted(false);   
    }

    const onEnd = () => {
        vibration();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false)
        onTimerEnd();
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown 
                minutes={minutes} 
                isPaused={!isStarted} 
                onProgress={onProgress} 
                onEnd={onEnd}
                />
            </View>
            <View style={styles.scontainer}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={{paddingTop:spacing.md}}>
                {/* <ProgressBar
                progress={progress}
                color="#5E84E2"
                style={{height: 5}}
                /> */}
            </View>
            <View style={styles.buttonWrapper}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View style={styles.buttonWrapper}>
                {isStarted ? 
                <Button title="start" onPress={() => setIsStarted(true)}/>
                : 
                <Button title="pause" onPress={() => setIsStarted(false)}/>
                }
            </View>
            <View style={styles.clearSubject}>
                <Button 
                title="-"
                onPress={() => clearSubject()}
                />
            </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scontainer: {
        paddingTop: spacing.xxl
    },
    title: {
        color: colors.white,
        textAlign: 'center'
    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearSubject: {
        paddingBottom: 25,
        paddingLeft: 25
    }
});