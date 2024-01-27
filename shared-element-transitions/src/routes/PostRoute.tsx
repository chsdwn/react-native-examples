import { PostDetailsScreen, PostListScreen } from '@/screens';
import { RouteProp } from '@react-navigation/core';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

type PostStackParamList = {
  PostList: undefined;
  PostDetails: { id: number };
};

export type PostRouteNavigationProp =
  NativeStackNavigationProp<PostStackParamList>;

export type PostDetailsRouteProp = RouteProp<PostStackParamList, 'PostDetails'>;

const Stack = createNativeStackNavigator<PostStackParamList>();

export const PostRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostList" component={PostListScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
    </Stack.Navigator>
  );
};
