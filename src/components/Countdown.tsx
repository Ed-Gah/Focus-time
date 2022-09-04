import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../utils/sizes';
import { useState, useEffect, useRef } from 'react';

const minutesToMillis = (min: number) => min * 1000 * 60;
const formatTime = (time: number) => time < 10 ? `0${time}` : time;

const Countdown = ({
    minutes = 0.1,
    isPaused,
    onProgress,
    onEnd
}) => {
    
    const interval = React.useRef(null);
    const [millis, setMillis] = useState(null);

    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                clearInterval(interval.current);
                return time;
            }
            const timeLeft = time-1000;
            return timeLeft; 
        })
    }

        useEffect(() => {
            setMillis(minutesToMillis(minutes))
        }, [minutes])

        useEffect(() => {
            onProgress(millis / (minutesToMillis(minutes)));
            if (millis === 0 ) {
                onEnd();
            }
        }, [millis])

        useEffect(() => {
        if (isPaused) {
            if (interval.current) clearInterval(interval.current)
            return;
        }
        interval.current = setInterval(countDown, 1000);
        return () => clearInterval(interval.current)
    }, [isPaused])

        const minute = Math.floor(millis / 1000 / 60) % 60;
        const seconds = Math.floor(millis / 1000) % 60;
    return (
            <Text style={styles.title}>{formatTime(minute)}:{formatTime(seconds)}</Text>
        
    );
};

export default Countdown;

const styles = StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: fontSizes.xxxl,
        padding: spacing.lg,
        fontWeight: 'bold',
        backgroundColor: 'rgba(94, 132, 226, 0.3)'
    }
});
