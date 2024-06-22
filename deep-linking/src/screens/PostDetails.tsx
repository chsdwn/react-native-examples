import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';

import { BaseParamList } from '@/routes';

type Route = RouteProp<BaseParamList, 'PostDetails'>;

export const PostDetails = () => {
  const {
    params: { id },
  } = useRoute<Route>();

  return (
    <View style={styles.container}>
      <Text>Post: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
