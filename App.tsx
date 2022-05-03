import { FlatList, StyleSheet, View, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import VideoRow from './components/videoRow/VideoRow';
import { Video } from './types/Video';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import firebaseConfig from './data_source/Firebase';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getVideos();
  }, [])

  const app = initializeApp(firebaseConfig);
  const firebase_videos = 'videos';

  //Fetches videos from Firebase Database
  const getVideos = async () => {
    setLoading(true)
    let videoList: Video[] = [];

    try {
      const videoRef = ref(getDatabase())
      get(child(videoRef, firebase_videos)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data != null) {
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
          }
          setVideos(videoList)
        }
      }).catch((error) => {
        console.error(error);
      });
      setLoading(false)
    } catch (e) {
      console.log(e);
      setVideos(videoList)
      setLoading(false)
    }
  }

  const renderVideos = ({ item }) => {
    return (
      <VideoRow key={item.id} selectedVideo={item} />
    );
  };

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <View style={styles.container}>
          <FlatList
            horizontal={false}
            data={videos}
            renderItem={renderVideos}
          />
        </View>
      ) : (
        <View style={styles.container} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },

  videoContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
