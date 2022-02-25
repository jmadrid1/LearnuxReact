import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Video } from '../../types/Video';
import VideoRow from '../videoRow/VideoRow';

interface IProps {
    videos: Video[],
}

const VideoList = (props: IProps) => {
    const { videos } = props;

    return (
        <ScrollView horizontal={false} >
            {videos.map((video: Video, index) => (
                <View style={styles.container} key={index}>
                    <VideoRow video={video} />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

});

export default VideoList