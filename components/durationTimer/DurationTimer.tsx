import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    duration: string,
}

const DurationTimer = (props: IProps) => {
    const { duration } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.time}>{duration}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        width: 60,
        borderRadius: 16,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    time: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },

});

export default DurationTimer;