import React from 'react';
import { View, Text, TouchableOpacity, Linking, ImageBackground, StyleSheet } from 'react-native';
import { Video } from '../../types/Video'
import DurationTimer from '../durationTimer/DurationTimer';
import CategoryBubble from '../categoryBubble/CategoryBubble';

interface IProps {
    selectedVideo: Video,
}

/**
 * @param {{ 
 * selectedVideo: Video
 * }} props 
 * @returns
 */

/**
 * VideoRow is a row component that displays the information associated to a video.
 * This screen is passed a selectedVideo Video object that React's navigation for navigating between screens and passing data.
 */
const VideoRow = (props: IProps) => {
    const { selectedVideo } = props;

    //Opens selected video in YouTube
    const openYouTubeVideo = () => {
        let url = 'https://www.youtube.com/watch?v='
        let videoID: string = selectedVideo.id

        let videoUrl = url + videoID
        Linking.openURL(videoUrl)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={openYouTubeVideo}>
            <ImageBackground style={styles.thumbnail} source={{ uri: selectedVideo.thumbnail }}>
                <DurationTimer duration={selectedVideo.duration} />
            </ImageBackground>

            <View style={styles.detailsContainer}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{selectedVideo.title}</Text>
                <Text numberOfLines={4} ellipsizeMode='tail' style={styles.description}>{selectedVideo.description}</Text>
            </View>

            <View style={styles.categoryContainer} >
                <CategoryBubble category={selectedVideo.category} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        maxHeight: 32,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 10,
    },

    container: {
        flexDirection: 'column',
        height: 370,
        width: '100%',
        elevation: 10,
        marginBottom: 10,
        backgroundColor: 'white',
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