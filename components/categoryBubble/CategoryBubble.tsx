import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    category: string;
}

/**
 * @param {{ 
 * category: string
 * }} props 
 * @returns
 */

/**
 * CategoryBubble is a component that displays the category of a video in a bubble.
 * This component is passed a category string prop for speciying the category for this component.
 */
const CategoryBubble = (props: IProps) => {
    const { category } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{category}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        maxHeight: 35,
        maxWidth: 100,
        borderRadius: 16,
        backgroundColor: '#80bfff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: 'white',
    },
});

export default CategoryBubble;