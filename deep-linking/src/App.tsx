import { useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { BaseParamList, BaseRoute } from './routes';

export const App = () => {
  const url = Linking.useURL();
  const navigationRef = useRef<NavigationContainerRef<BaseParamList>>(null);

  if (url) {
    const { path, queryParams } = Linking.parse(url);

    if (path === 'home') {
      navigationRef.current?.navigate('Home');
    } else if (path === 'posts') {
      navigationRef.current?.navigate('Posts');
    } else if (path === 'post' && queryParams?.['id']) {
      const id = Array.isArray(queryParams.id)
        ? queryParams.id[0]
        : queryParams.id;
      navigationRef.current?.navigate('PostDetails', { id });
    }
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <BaseRoute />
    </NavigationContainer>
  );
};
