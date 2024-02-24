import { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  LinearTransition,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const initialData = Array(10)
  .fill(0)
  .map((_, i) => ({ id: i }));

export const App = () => {
  const [data, setData] = useState(initialData);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item, index }) => (
            <Item
              index={index}
              item={item}
              onDeletePress={() =>
                setData((prev) => prev.filter((i) => i.id !== item.id))
              }
            />
          )}
          contentContainerStyle={{ rowGap: 8 }}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

type Props = {
  item: (typeof initialData)[number];
  index: number;
  onDeletePress: () => void;
};

const Item = ({ item, index, onDeletePress }: Props) => {
  const left = useSharedValue(0);

  const leftFling = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      left.value = withTiming(-100, { duration: 300 });
    });

  const rightFling = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      left.value = withTiming(0, { duration: 300 });
    });

  return (
    <Animated.View
      entering={FadeInLeft.delay(500 + index * 100)}
      exiting={FadeOutLeft.delay(300)}
      style={{
        position: 'relative',
      }}
    >
      <Pressable
        onPress={onDeletePress}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: 100,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 24, color: 'white' }}>X</Text>
      </Pressable>

      <GestureDetector gesture={leftFling}>
        <GestureDetector gesture={rightFling}>
          <Animated.View
            style={{
              padding: 48,
              backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
              left,
            }}
          >
            <Text>#{item.id}</Text>
          </Animated.View>
        </GestureDetector>
      </GestureDetector>
    </Animated.View>
  );
};
