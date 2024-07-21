import { StyleSheet, View } from 'react-native';
import { Home, Login } from './screens';
import { useUserStore } from './stores';

export const App = () => {
  const authenticated = useUserStore((s) => s.authenticated);

  return (
    <View style={styles.container}>
      {authenticated && <Home />}
      {!authenticated && <Login />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
