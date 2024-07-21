import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { useUserStore } from '@/stores';

export const Login = () => {
  const login = useUserStore((s) => s.login);

  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameTextChange = (text: string) => {
    setUsername(text);
    setErrorMessage('');
  };

  const handlePasswordTextChange = (text: string) => {
    setPassword(text);
    setErrorMessage('');
  };

  const handleLogin = () => {
    if (username === 'chsdwn' && password === '123456') {
      login(username);
    } else {
      setErrorMessage('Username or password is wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        testID="LoginUsernameInput"
        placeholder="Username"
        value={username}
        textContentType="username"
        autoCapitalize="none"
        onChangeText={handleUsernameTextChange}
        style={styles.input}
      />
      <TextInput
        testID="LoginPasswordInput"
        placeholder="Password"
        value={password}
        textContentType="password"
        onChangeText={handlePasswordTextChange}
        style={styles.input}
      />
      {!!errorMessage && (
        <Text testID="LoginErrorMessageText" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}
      <Button testID="LoginLoginButton" title="Login" onPress={handleLogin} />
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
  input: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  errorMessage: {
    color: 'red',
  },
});
