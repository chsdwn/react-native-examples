import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, PostDetails, Posts } from '@/screens';

export type BaseParamList = {
  Home: undefined;
  Posts: undefined;
  PostDetails: { id: string };
};

const Stack = createNativeStackNavigator<BaseParamList>();

export const BaseRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
};
