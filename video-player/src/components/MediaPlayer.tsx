import { useState } from 'react';
import { View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import VideoPlayer from 'react-native-media-console';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const video = require('../assets/video.mp4');

export const MediaPlayer = () => {
  const { top } = useSafeAreaInsets();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleEnterFullscreen = () => {
    setIsFullscreen(true);
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
    );
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={isFullscreen} />
      <View
        style={{
          marginTop: isFullscreen ? 0 : top,
          height: isFullscreen ? '100%' : '40%',
        }}
      >
        <VideoPlayer
          source={video}
          onEnterFullscreen={handleEnterFullscreen}
          onExitFullscreen={handleExitFullscreen}
          onBack={handleExitFullscreen}
          disableBack={!isFullscreen}
        />
      </View>
    </View>
  );
};
