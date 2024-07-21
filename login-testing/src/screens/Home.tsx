import { Button, StyleSheet, Text, View } from 'react-native';

import { useUserStore } from '@/stores';

export const Home = () => {
  const username = useUserStore((s) => s.username);
  const logout = useUserStore((s) => s.logout);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.welcomeText}>Welcome: {username}</Text>
      <Button testID="HomeLogoutButton" title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  welcomeText: {
    textAlign: 'center',
  },
});
