import React from 'react';
import { View, StyleSheet, FlatList, Text,
SafeAreaView, 
Button} from 'react-native';
import { spacing, fontSizes, paddingSizes, colors } from '../../utils/sizes';

const HistoryItem = ({item, index}) => {
    return (
        <>
        <Text style={styles.historyItem}>
            {item.subject}
        </Text>
        </>
    );
};

const FocusHistory = ({ focusHistory, onClear }) => {
    
    const clearHistory = () => {
        onClear();
    }
    
    return (
        <>
            <SafeAreaView style={{flex: 0.5, alignItems: 'center'}}>
            {!!focusHistory && (
                <>
                <Text style={styles.title}>Thing We've Focused On</Text>
                        <FlatList 
                            style={{ flex: 1 }}
                            contentContainerStyle={{flex: 1, alignItems: 'center'}}
                            data={focusHistory}
                            renderItem={HistoryItem}
                        />
                    <View style={styles.clearContainer}>
                        <Button title="Clear"
                        onPress={() => onClear()}
                        />
                    </View>
                </>
                )}
            </SafeAreaView>
        </>
    )
}

export default FocusHistory;


const styles = StyleSheet.create({
    historyItem: (status) => ({
        color: status > 1 ? 'red' : 'green',
        fontSize: fontSizes.md
    }),
    title: {
        color: colors.white,
        fontSize: fontSizes.lg
    },
    clearContaier: {
        alignItems: 'center',
        padding: spacing.md,
    }
});