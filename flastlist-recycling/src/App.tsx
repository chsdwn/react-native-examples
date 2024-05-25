import React, { useRef, useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

type Item = {
  id: number;
  backgroundColor: string;
  count: number;
};

const data: Item[] = Array(20)
  .fill(null)
  .map((_, id) => ({
    id,
    backgroundColor: 'pink',
    count: 0,
  }));

const Item = ({ item }: { item: Item }) => {
  const inputRef = useRef<TextInput>(null);

  const lastItemId = useRef(item.id);
  const [count, setCount] = useState(item.count);
  const [backgroundColor, setBackgroundColor] = useState(item.backgroundColor);
  if (lastItemId.current !== item.id) {
    lastItemId.current = item.id;
    setCount(item.count);
    setBackgroundColor(item.backgroundColor);
  }

  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 8,
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextInput
        ref={inputRef}
        placeholder="Background color"
        value={backgroundColor}
        onChangeText={setBackgroundColor}
        style={{ fontSize: 32, padding: 16 }}
        autoCapitalize="none"
      />
      <Text style={{ fontSize: 48, fontWeight: 'bold' }}>{count}</Text>
      <View style={{ flexDirection: 'row', gap: 32, marginTop: 16 }}>
        <Pressable onPress={() => {}}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>-</Text>
        </Pressable>
        <Pressable onPress={() => setCount((prev) => prev + 1)}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlashList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Item item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={262}
        />
      </View>
    </SafeAreaView>
  );
};
