import { useGetPostsQuery } from '@/store';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const initialLimit = 10;
const initialStart = 0;

export const PostListScreen = () => {
  const [start, setStart] = useState(initialStart);
  const {
    data: posts,
    isLoading,
    isFetching,
  } = useGetPostsQuery({ limit: initialLimit, start });

  const handleRefresh = () => {
    setStart(initialStart);
  };

  const handleEndReached = () => {
    if (posts?.length === start + initialLimit) {
      setStart((prev) => prev + initialLimit);
    }
  };

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => String(item.id)}
      refreshing={isFetching}
      onRefresh={handleRefresh}
      onEndReached={handleEndReached}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: '#eee',
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
          <Text numberOfLines={2} style={{ fontSize: 14, marginTop: 16 }}>
            {item.body}
          </Text>
        </View>
      )}
      ListFooterComponent={() => (
        <View>{isFetching && <ActivityIndicator size="small" />}</View>
      )}
    />
  );
};
