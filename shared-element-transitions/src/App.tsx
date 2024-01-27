import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { PostRoute } from './routes';

export const App = () => {
  return (
    <NavigationContainer>
      <PostRoute />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
};
