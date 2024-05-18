import { Dimensions, SafeAreaView, View } from 'react-native';
import { MasonryFlashList } from '@shopify/flash-list';
import { ResizeMode, Video } from 'expo-av';
import { Image } from 'expo-image';

const videoUris = [
  'https://cdn.pixabay.com/video/2023/03/15/154787-808530571_tiny.mp4',
  'https://cdn.pixabay.com/video/2023/11/19/189692-886572510_tiny.mp4',
  'https://cdn.pixabay.com/video/2023/01/25/147898-792811387_tiny.mp4',
  'https://cdn.pixabay.com/video/2022/07/24/125314-733046618_tiny.mp4',
  'https://cdn.pixabay.com/video/2021/08/13/84878-588566505_tiny.mp4',
  'https://cdn.pixabay.com/video/2021/08/13/84881-588566509_tiny.mp4',
  'https://cdn.pixabay.com/video/2022/09/19/131824-751934493_tiny.mp4',
  'https://cdn.pixabay.com/video/2023/01/25/147899-792811391_tiny.mp4',
  'https://cdn.pixabay.com/video/2022/10/07/133925-758328055_tiny.mp4',
  'https://cdn.pixabay.com/video/2022/10/04/133507-756991150_tiny.mp4',
];

const videoDensity = 7;
const videoUrisLength = videoUris.length;
const length = videoUrisLength * videoDensity + Math.floor(videoUrisLength / 2);
const uris = Array(length)
  .fill(null)
  .map((_, i) => {
    if (i > 0 && i % 7 === 0) return videoUris.splice(-1)[0];
    return `https://picsum.photos/seed/image${i}/400/400`;
  });

const videoExtensions = ['mp4'];
const checkIfVideoByUri = (uri: string) => {
  if (!uri) return false;
  const ext = uri.split('.').at(-1);
  if (!ext) return false;
  return videoExtensions.includes(ext);
};

const { width } = Dimensions.get('window');
const numColumns = 3;
const itemSize = width / numColumns;

export const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginRight: 1 }}>
        <MasonryFlashList
          data={uris}
          numColumns={numColumns}
          keyExtractor={(item) => item}
          getItemType={(item) => (checkIfVideoByUri(item) ? 'video' : 'image')}
          estimatedItemSize={itemSize}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
          optimizeItemArrangement
          overrideItemLayout={(layout, item) => {
            const isVideo = checkIfVideoByUri(item);
            layout.size = isVideo ? itemSize * 2 : itemSize;
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isVideo = checkIfVideoByUri(item);
            if (isVideo) {
              return (
                <Video
                  isLooping
                  shouldPlay
                  source={{ uri: item }}
                  resizeMode={ResizeMode.COVER}
                  style={{ flex: 1, aspectRatio: 1 / 2, marginLeft: 1 }}
                />
              );
            }

            return (
              <Image
                source={item}
                recyclingKey={item}
                style={{ flex: 1, aspectRatio: 1, marginLeft: 1 }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
