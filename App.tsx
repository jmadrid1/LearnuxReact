import { FlatList, StyleSheet, View, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import VideoRow from './components/videoRow/VideoRow';
import { Video } from './types/Video';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from './data_source/Firebase';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(true)

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
      setLoading(false)
    });
  }

  const renderVideos = ({ item }) => {
    return (
      <View style={styles.videoContainer} key={item.id}>
        <VideoRow video={item} />
      </View>
    );
  };

  if(!isLoading){
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={false}
          data={videos}
          renderItem={renderVideos}
        />
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
      </View>
    );
  }
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
