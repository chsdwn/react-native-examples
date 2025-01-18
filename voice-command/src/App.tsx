import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Fuse from 'fuse.js';
import Animated, {
  clamp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const MIN_VOLUME = -2;
const MAX_VOLUME = 10;
const TARGET_FPS = 60;
const VOICE_BUBBLE_SIZE = 120;

const commands = [
  {
    command: 'open profile',
    description: 'navigate to the Profile screen',
  },
  {
    command: 'open settings',
    description: 'navigate to the Settings screen',
  },
];
const fuse = new Fuse(commands, {
  minMatchCharLength: 2,
  keys: ['command'],
});

export const App = () => {
  const voiceVolume = useSharedValue(MIN_VOLUME);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useSpeechRecognitionEvent('start', () => setIsListening(true));
  useSpeechRecognitionEvent('end', () => setIsListening(false));
  useSpeechRecognitionEvent('result', (event) => {
    setTranscript(event.results?.[0].transcript ?? '');
  });
  useSpeechRecognitionEvent('volumechange', (event) => {
    voiceVolume.value = clamp(event.value, MIN_VOLUME, MAX_VOLUME);
  });

  useEffect(() => {
    ExpoSpeechRecognitionModule.requestPermissionsAsync();
  }, []);

  useEffect(() => {
    if (!transcript) return;

    const res = fuse.search(transcript);
    if (res.length === 0) return;
    const id = setTimeout(() => {
      Alert.alert('Command', res[0].item.description);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [transcript]);

  const voiceBubbleStyle = useAnimatedStyle(() => ({
    width: VOICE_BUBBLE_SIZE,
    height: VOICE_BUBBLE_SIZE,
    borderRadius: VOICE_BUBBLE_SIZE / 2,
    backgroundColor: 'pink',
    transform: [
      {
        scale: withSpring(
          interpolate(voiceVolume.value, [MIN_VOLUME, MAX_VOLUME], [0.75, 1]),
        ),
      },
    ],
  }));

  const handleListenPress = () => {
    ExpoSpeechRecognitionModule.start({
      lang: 'en-US',
      volumeChangeEventOptions: {
        enabled: true,
        intervalMillis: Math.ceil(1000 / TARGET_FPS),
      },
    });
  };

  const handleStopPress = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={voiceBubbleStyle} />
      <Text>{isListening ? '...' : transcript}</Text>
      <Button
        title="Listen"
        disabled={isListening}
        onPress={handleListenPress}
      />
      <Button title="Stop" disabled={!isListening} onPress={handleStopPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
