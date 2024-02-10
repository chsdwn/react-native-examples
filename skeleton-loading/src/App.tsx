import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Image, ShimmerPlaceholder } from './components';

const posts = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Consectetur adipiscing elit. Ut consequat est sed augue tristique, et vulputate ex interdum. Praesent venenatis urna metus, porttitor sagittis erat tristique nec.',
    image: 'https://picsum.photos/seed/post-1/500/300',
  },
  {
    id: 2,
    title:
      'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
    description:
      'Etiam posuere in nunc non facilisis. Sed ac sapien a nisl semper pretium. Integer semper eros enim, ut vestibulum augue gravida commodo.',
    image: 'https://picsum.photos/seed/post-2/500/300',
  },
  {
    id: 3,
    title: 'Nunc quis arcu risus, Nulla facilisi',
    description:
      'Phasellus non est vehicula, pharetra erat sit amet, accumsan massa. Aliquam condimentum neque at nisl congue, a venenatis lorem sollicitudin.',
    image: 'https://picsum.photos/seed/post-3/500/300',
  },
];

const Skeleton = () => (
  <View style={styles.postContainer}>
    <ShimmerPlaceholder style={styles.skeletonImage} />
    <View style={styles.postTextContainer}>
      <ShimmerPlaceholder style={styles.skeletonTitle} />
      <ShimmerPlaceholder style={styles.skeletonDescriptionLine1} />
      <ShimmerPlaceholder style={styles.skeletonDescriptionLine2} />
    </View>
  </View>
);

export const App = () => {
  const [data, setData] = useState<(typeof posts)[number][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000 * 5));
      setData(posts);
      setLoading(false);
    };
    loadDataAsync();
  }, []);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
        {loading && (
          <ScrollView
            contentContainerStyle={styles.dataList}
            showsVerticalScrollIndicator={false}
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </ScrollView>
        )}

        {!loading && (
          <FlatList
            data={data}
            keyExtractor={(item) => `post-${item.id}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.dataList}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Image source={item.image} style={styles.postImage} />
                <View style={styles.postTextContainer}>
                  <Text numberOfLines={1} style={styles.postTitle}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={2} style={styles.postDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
  dataList: {
    paddingVertical: 16,
    rowGap: 16,
  },
  postContainer: {
    overflow: 'hidden',
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: StyleSheet.hairlineWidth,
  },
  postImage: {
    flex: 1,
    aspectRatio: 5 / 3,
  },
  postTextContainer: {
    padding: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDescription: {
    marginTop: 8,
    fontSize: 14,
  },
  skeletonImage: {
    width: '100%',
    height: 200,
  },
  skeletonTitle: {
    width: '100%',
    height: 16,
  },
  skeletonDescriptionLine1: {
    width: '100%',
    height: 14,
    marginTop: 8,
  },
  skeletonDescriptionLine2: {
    width: '80%',
    height: 14,
    marginTop: 4,
  },
});
