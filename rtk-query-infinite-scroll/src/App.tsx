import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { PostListScreen } from './screens';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <PostListScreen />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
