import { View } from 'react-native';

import { AppText } from './components';

export const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText
        numberOfLines={0}
        style={{ fontSize: 24, textAlign: 'center', paddingHorizontal: 32 }}
      >
        Feature Driven Design Project Structure Example
      </AppText>
    </View>
  );
};
