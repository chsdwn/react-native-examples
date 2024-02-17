import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ListScreen } from './screens';

export const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <ListScreen />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
