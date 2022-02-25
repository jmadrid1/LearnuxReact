import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Video } from './types/Video';
import VideoList from './components/videoList/VideoList';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from './data_source/Firebase';

export default function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, [])

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const firebase_videos = 'videos';

  const getVideos = () => {
    const videoRef = ref(db, firebase_videos);

    let videoList: Video[] = [];

    onValue(videoRef, (snapshot) => {
      const data = snapshot.val();
      for (const key of Object.keys(data)) {
        const item: Video = data[key];

        let video: Video = {
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          duration: item.duration,
          thumbnail: item.thumbnail
        }
        videoList.push(video)
      }
      setVideos(videoList)
    });
  }

  return (
    <View style={styles.container}>
      <VideoList videos={videos}></VideoList>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#d1d1d1',
    alignItems: 'center',
  },
});
