import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';

export const App = () => {
  const [netInfoType, setNetInfoType] = useState<NetInfoStateType | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((event) => {
      setNetInfoType(event.type);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Text style={{ fontSize: 24 }}>Internet Connection Check</Text>
      {netInfoType && (
        <Text style={{ fontSize: 18 }}>
          Internet connection type: {netInfoType}
        </Text>
      )}
      {netInfoType !== NetInfoStateType.none && (
        <SafeAreaView
          style={{
            position: 'absolute',
            top: StatusBar.currentHeight ?? 0,
            left: 0,
            right: 0,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              padding: 16,
            }}
          >
            <Text>No internet connection</Text>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};
