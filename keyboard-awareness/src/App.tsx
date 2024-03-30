import { useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

export const App = () => {
  const [inputCount, setInputCount] = useState(16);
  const [footerHeight, setFooterHeight] = useState(0);

  const handleFooterLayout = (e: LayoutChangeEvent) => {
    setFooterHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={{ flex: 1, paddingTop: 64 }}>
      <KeyboardProvider statusBarTranslucent>
        <KeyboardAwareScrollView
          bottomOffset={footerHeight + 16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
        >
          {Array(inputCount)
            .fill(0)
            .map((_, i) => (
              <TextInput
                key={i}
                placeholder={`Input ${i + 1}`}
                placeholderTextColor="#999"
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 24,
                }}
              />
            ))}
        </KeyboardAwareScrollView>

        <KeyboardStickyView
          onLayout={handleFooterLayout}
          style={{
            flexDirection: 'row',
            gap: 8,
            padding: 16,
            borderColor: 'black',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            backgroundColor: 'white',
          }}
        >
          <Pressable
            onPress={() => setInputCount((prev) => prev + 1)}
            style={[styles.btn, { backgroundColor: '#eee' }]}
          >
            <Text style={styles.btnTitle}>Add Input</Text>
          </Pressable>
          <Pressable style={[styles.btn, { backgroundColor: 'skyblue' }]}>
            <Text style={styles.btnTitle}>Continue</Text>
          </Pressable>
        </KeyboardStickyView>
      </KeyboardProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
