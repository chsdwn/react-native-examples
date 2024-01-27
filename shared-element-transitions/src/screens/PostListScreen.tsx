import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';

import { posts } from '@/data';
import { usePostNavigation } from '@/hooks';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const PostListScreen = () => {
  const navigation = usePostNavigation();

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => `post-${item.id}`}
        renderItem={({ item: post }) => (
          <Pressable
            onPress={() => navigation.navigate('PostDetails', { id: post.id })}
            style={styles.itemContainer}
          >
            <AnimatedImage
              source={{ uri: post.thumbnail }}
              style={styles.itemImage}
              sharedTransitionTag={`post-image-${post.id}`}
            />
            <View style={styles.itemTextContainer}>
              <Text numberOfLines={1} style={styles.itemTitle}>
                {post.title}
              </Text>
              <Text numberOfLines={2} style={styles.itemDescription}>
                {post.description}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 60,
    borderRadius: 4,
  },
  itemTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});
