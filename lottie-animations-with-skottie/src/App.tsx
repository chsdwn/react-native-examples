import { Dimensions, Text, View } from 'react-native';
import { Skottie } from 'react-native-skottie';

const { width } = Dimensions.get('screen');

const likeAnimation = require('@/assets/animations/like.lottie');

export const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>
        {'Optimized Lottie Animations\nwith Skottie'}
      </Text>
      <Skottie
        source={likeAnimation}
        autoPlay
        loop
        style={{ width, height: width, backgroundColor: 'pink' }}
      />
    </View>
  );
};
