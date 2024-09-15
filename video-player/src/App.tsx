import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MediaPlayer } from './components';

export const App = () => {
  return (
    <SafeAreaProvider>
      <MediaPlayer />
    </SafeAreaProvider>
  );
};
