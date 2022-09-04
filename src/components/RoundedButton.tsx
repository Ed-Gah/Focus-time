import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { spacing } from "../utils/sizes";

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 78,
    ...props
}) => {
    return (
        <View>
            <TouchableOpacity style={[styles(size).radius, style]}>
                <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = (size) => StyleSheet.create({
    radius: {
        borderRadius: size / 2,
        width: size,
        height: size,
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2 
    },
    text: {
        color: 'white',
        fontSize: size / 3,
    }
});
