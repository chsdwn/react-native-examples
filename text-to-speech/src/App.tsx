import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [voice, setVoice] = useState<Speech.Voice | null>(null);
  const [text, setText] = useState(
    "Hello, I'm chsdwn. Welcome to my channel. Please like and subscribe.",
  );
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setLoading(true);
    Speech.getAvailableVoicesAsync().then((voices) => {
      setVoices(voices);
      setVoice(voices[0] ?? null);
      setLoading(false);
    });
  }, []);

  const handleSpeakPress = async () => {
    if (!voice) return;
    await Speech.stop();
    Speech.speak(text, { language: voice.language });
  };

  const handlePausePress = async () => {
    await Speech.pause();
    setPaused(true);
  };

  const handleResumePress = async () => {
    await Speech.resume();
    setPaused(false);
  };

  const handleStopPress = async () => {
    await Speech.stop();
    setPaused(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Voices</Text>

      <TextInput
        placeholder="Text..."
        multiline
        value={text}
        onChangeText={setText}
        numberOfLines={5}
        style={styles.input}
      />

      <View style={styles.buttonsContainer}>
        <Button title="Speak" onPress={handleSpeakPress} />
        {Platform.OS !== 'android' && (
          <Button
            title={paused ? 'Resume' : 'Pause'}
            onPress={paused ? handleResumePress : handlePausePress}
          />
        )}
        <Button title="Stop" onPress={handleStopPress} />
      </View>

      <FlatList
        data={voices}
        keyExtractor={(item) => item.identifier}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setVoice(item)}
            style={[
              styles.voiceButton,
              { backgroundColor: item === voice ? 'gray' : 'white' },
            ]}
          >
            <Text style={styles.languageText}>{item.language}</Text>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
  },
  input: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    borderRadius: 3,
    fontSize: 15,
  },
  buttonsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  listContentContainer: {
    marginTop: 16,
    gap: 16,
  },
  voiceButton: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    gap: 8,
  },
  languageText: {
    fontWeight: 'bold',
  },
});
