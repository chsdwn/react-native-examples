import { StyleSheet, Text, View } from 'react-native';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deep Linking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
});
