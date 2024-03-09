import { FlatList, StyleSheet, View } from 'react-native';
import { Image, ImageLoadEventData } from 'expo-image';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type DynamicImageProps = {
  source: string;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);
const DynamicImage = ({ source }: DynamicImageProps) => {
  const aspectRatio = useSharedValue(1);

  const handleLoad = (event: ImageLoadEventData) => {
    const {
      source: { height, width },
    } = event;
    aspectRatio.value = withTiming(width / height, { duration: 1000 * 5 });
  };

  return (
    <AnimatedImage
      style={{ aspectRatio }}
      onLoad={handleLoad}
      source={source}
      transition={1000 * 5}
      contentFit="contain"
      placeholder={blurhash}
    />
  );
};

const images = [
  'https://picsum.photos/400/800',
  'https://picsum.photos/800/400',
  'https://picsum.photos/800/800',
  'https://picsum.photos/400/800',
  'https://picsum.photos/800/400',
];

export const App = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ item }) => <DynamicImage source={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
