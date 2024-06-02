import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ID, Models } from 'react-native-appwrite';

import { appwrite } from './lib';

export const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  const getActiveUser = async () => {
    try {
      const user = await appwrite.account.get();
      setUser(user);
    } catch (err) {
      console.warn('[getActiveUser()]:err', err);
    }
  };

  useEffect(() => {
    setLoading(true);
    getActiveUser();
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await appwrite.account.deleteSession('current');
      setUser(null);
    } catch (err) {
      console.warn('[handleLogout()]:err', err);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await appwrite.account.createEmailPasswordSession(email, password);
      getActiveUser();
    } catch (err) {
      console.warn('[handleLogin()]:err', err);
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await appwrite.account.create(ID.unique(), email, password);
      await handleLogin();
    } catch (err) {
      console.warn('[handleRegister()]:err', err);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          Appwrite Login
        </Text>
        {user && (
          <>
            <Button title="Logout" onPress={handleLogout} />
            <Text>{JSON.stringify(user, undefined, 4)}</Text>
          </>
        )}
        {!user && (
          <>
            <TextInput
              placeholder="name@mail.com"
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="emailAddress"
              keyboardType="email-address"
              style={styles.input}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
            >
              <Button title="Login" onPress={handleLogin} />
              <Button title="Register" onPress={handleRegister} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 32,
    gap: 16,
  },
  input: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 8,
    fontSize: 16,
  },
});
