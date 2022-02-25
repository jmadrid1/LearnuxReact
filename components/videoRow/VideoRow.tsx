import React from 'react';
import { View, Text, TouchableOpacity, Linking, ImageBackground, StyleSheet } from 'react-native';
import { Video } from '../../types/Video'
import DurationTimer from '../durationTimer/DurationTimer';
import CategoryBubble from '../categoryBubble/CategoryBubble';

interface IProps {
    video: Video,
}

const VideoRow = (props: IProps) => {
    const { video } = props;

    const openYouTubeVideo = () => {
        let url = 'https://www.youtube.com/watch?v='
        let videoID: string = video.id

        let videoUrl = url + videoID
        Linking.openURL(videoUrl)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={openYouTubeVideo}>

            <ImageBackground style={styles.thumbnail} source={{ uri: video.thumbnail }}>
                <DurationTimer duration={video.duration} />
            </ImageBackground>

            <View style={styles.detailsContainer}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{video.title}</Text>
                <Text numberOfLines={4} ellipsizeMode='tail' style={styles.description}>{video.description}</Text>
            </View>

            <View style={styles.categoryContainer} >
                <CategoryBubble category={video.category} />
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        height: 370,
        width: '100%',
        elevation: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },

    categoryContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        maxHeight: 32,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 10,
    },

    description: {
        fontSize: 13,
        marginLeft: 5,
        color: 'black',
    },

    detailsContainer: {
        flexDirection: 'column',
        flexGrow: 1,
        maxHeight: 110,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },

    thumbnail: {
        flexGrow: 5,
        backgroundColor: 'black',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 5,
        paddingRight: 5
    },

    timeContainer: {
        display: 'flex',
        height: 30,
        width: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    title: {
        fontSize: 18,
        marginTop: 5,
        marginLeft: 5,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'flex-start',
    },

});

export default VideoRow;