import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';

import { usePostDetailsRoute } from '@/hooks';
import { posts } from '@/data';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const PostDetailsScreen = () => {
  const {
    params: { id },
  } = usePostDetailsRoute();

  const post = posts.find((p) => p.id === id)!;

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={{ uri: post.thumbnail }}
        style={styles.image}
        sharedTransitionTag={`post-image-${id}`}
      />

      <SafeAreaView style={styles.textContainer}>
        <Animated.Text entering={FadeInLeft.duration(400)} style={styles.title}>
          {post.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.duration(400).delay(200)}
          style={styles.description}
        >
          {post.description}
        </Animated.Text>
      </SafeAreaView>
    </View>
  );
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 2) / 3,
  },
  textContainer: {
    margin: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginTop: 24,
  },
});
