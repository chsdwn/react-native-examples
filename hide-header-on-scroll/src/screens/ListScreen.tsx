import { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const data = Array(10)
  .fill(null)
  .map((_, i) => ({ id: String(i) }));

const HEIGHT_VISIBILITY_THRESHOLD = 50;

export const ListScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollYRef = useRef(0);

  const top = useSharedValue(0);

  const [headerHeight, setHeaderHeight] = useState(0);

  const headerStyle = useAnimatedStyle(() => ({
    top: top.value,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={10}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y;
          const scrollingDown = y > scrollYRef.current;

          if (scrollingDown && y > HEIGHT_VISIBILITY_THRESHOLD) {
            top.value = withSpring(-headerHeight, { damping: 16 });
          } else if (!scrollingDown && y < HEIGHT_VISIBILITY_THRESHOLD) {
            top.value = withSpring(0, { damping: 16 });
          }
        }}
        contentContainerStyle={[
          styles.listContainer,
          { paddingTop: headerHeight + 16, paddingBottom: insets.bottom + 16 },
        ]}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>#{item.id}</Text>
          </View>
        )}
      />

      <View style={[styles.headerContainerContainer, { top: insets.top }]}>
        <View style={styles.headerContainer}>
          <Animated.View
            onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
            style={[styles.header, headerStyle]}
          >
            <Text style={styles.headerTitle}>Header</Text>
          </Animated.View>
        </View>
      </View>

      <View style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 16,
    rowGap: 16,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: 8,
    paddingVertical: 64,
  },
  headerContainerContainer: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  headerContainer: {
    position: 'relative',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 96,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});
