import { useRef } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Text>Keyboard Aware Bottom Sheet</Text>
          <Button
            title="Open"
            onPress={() => {
              modalRef.current?.present();
            }}
          />
        </View>

        <BottomSheetModal
          ref={modalRef}
          snapPoints={['50%']}
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          backdropComponent={() => (
            <Pressable
              onPress={() => {
                modalRef.current?.dismiss();
              }}
              style={styles.backdrop}
            />
          )}
        >
          <BottomSheetFlatList
            data={new Array(10).fill(null)}
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={styles.container}
            renderItem={({ index }) => (
              <BottomSheetTextInput
                placeholder={`#${index} input`}
                style={styles.input}
              />
            )}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 16,
  },
});
