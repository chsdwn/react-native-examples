import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { MultiStoryContainer, TransitionMode } from 'react-native-story-view';
import { StatusBar } from 'expo-status-bar';

const ringColors = ['#C913B9', '#F9373F', '#FECD00'];
const stories = Array(3)
  .fill(null)
  .map((_, i) => ({
    id: i,
    username: `User ${i + 1}`,
    profile: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? 'men' : 'women'
    }/${i}.jpg`,
    stories: [
      {
        id: 0,
        url: 'https://cdn.pixabay.com/video/2024/03/01/202587-918431513_tiny.mp4',
        type: 'video',
        duration: 20,
      },
      {
        id: 1,
        url: 'https://picsum.photos/seed/story-1/600/1200',
        type: 'image',
        duration: 5,
      },
      {
        id: 2,
        url: 'https://cdn.pixabay.com/video/2024/03/29/206008_tiny.mp4',
        type: 'video',
        duration: 7,
      },
      {
        id: 3,
        url: 'https://picsum.photos/seed/story-1/1200/600',
        type: 'image',
        duration: 5,
      },
    ],
  }));

export const App = () => {
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyVisible, setStoryVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              setStoryVisible(true);
              setStoryIndex(index);
            }}
          >
            <LinearGradient colors={ringColors} style={styles.ringGradient}>
              <View style={styles.ringBorder}>
                <Image source={{ uri: item.profile }} style={styles.avatar} />
              </View>
            </LinearGradient>
          </Pressable>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {storyVisible && (
        <MultiStoryContainer
          stories={stories}
          transitionMode={TransitionMode.Cube}
          onComplete={() => setStoryVisible(false)}
          userStoryIndex={storyIndex}
          visible={storyVisible}
          viewedStories={[[]]}
        />
      )}
      <StatusBar translucent={false} style="light" />
    </SafeAreaView>
  );
};

const gradientDegree = '45deg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  ringGradient: {
    padding: 3,
    borderRadius: 9999,
    transform: [{ rotate: gradientDegree }],
  },
  ringBorder: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 9999,
    transform: [{ rotate: `-${gradientDegree}` }],
  },
  avatar: {
    width: 86,
    aspectRatio: 1,
    borderRadius: 9999,
  },
  listContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
});
