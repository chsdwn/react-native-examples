import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { BaseParamList } from '@/routes';

const posts = Array(10)
  .fill(null)
  .map((_, id) => ({
    id,
    title: `#${id}: Post title`,
  }));

export const Posts = () => {
  const navigation = useNavigation<NativeStackNavigationProp<BaseParamList>>();

  const handleItemPress = (id: number) => {
    navigation.navigate('PostDetails', { id: String(id) });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleItemPress(item.id)}
            style={styles.item}
          >
            <Text>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  item: {
    padding: 64,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
  },
});
