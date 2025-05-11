import {
  LegendList,
  useRecyclingEffect,
  useRecyclingState,
} from '@legendapp/list';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

type Item = {
  id: number;
};

const data: Item[] = new Array(20).fill(null).map((_, id) => ({ id }));

const Item = ({ id }: Item) => {
  const [renderCount, setRenderCount] = useRecyclingState(() => 1);

  useRecyclingEffect(() => {
    setRenderCount((prev) => prev + 1);
  });

  return (
    <View
      style={{
        backgroundColor: (renderCount ?? 0) > 1 ? 'skyblue' : 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 64,
        paddingHorizontal: 16,
        gap: 16,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>#{id}</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Render count: {renderCount}
      </Text>
    </View>
  );
};

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LegendList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        recycleItems
        waitForInitialLayout
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Item id={item.id} />}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
