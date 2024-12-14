import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { faker } from '@faker-js/faker';
import { isPointCluster, useClusterer } from 'react-native-clusterer';
import MapView, { Marker, Region } from 'react-native-maps';

const { height, width } = Dimensions.get('screen');
const initialRegion: Region = {
  latitude: 41.02,
  longitude: 29.03,
  longitudeDelta: 0.1,
  latitudeDelta: 0.1,
};

const markers = Array(10)
  .fill(null)
  .map(() => {
    const offset = 0.1;
    const { latitude, longitude } = initialRegion;
    return {
      id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      longitude: faker.location.longitude({
        min: longitude - offset,
        max: longitude + offset,
      }),
      latitude: faker.location.latitude({
        min: latitude - offset,
        max: latitude + offset,
      }),
    };
  });

export const App = () => {
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>(initialRegion);

  const [points, _superClusterer] = useClusterer(
    markers.map((marker) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [marker.longitude, marker.latitude],
      },
      properties: {
        id: marker.id,
        avatar: marker.avatar,
      },
    })),
    { height, width },
    region,
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={initialRegion}
        onRegionChangeComplete={setRegion}
        style={styles.map}
      >
        {points.map((point) => {
          const isCluster = isPointCluster(point);

          if (isCluster) {
            return (
              <Marker
                key={point.properties.cluster_id}
                coordinate={{
                  latitude: point.geometry.coordinates[1],
                  longitude: point.geometry.coordinates[0],
                }}
              >
                <Pressable
                  onPress={() => {
                    const region = point.properties.getExpansionRegion();
                    mapRef.current?.animateToRegion(region);
                  }}
                  style={styles.clusterMarker}
                >
                  <Text>+{point.properties.point_count}</Text>
                </Pressable>
              </Marker>
            );
          }

          return (
            <Marker
              key={point.properties.id}
              coordinate={{
                latitude: point.geometry.coordinates[1],
                longitude: point.geometry.coordinates[0],
              }}
            >
              <Image
                source={{ uri: point.properties.avatar }}
                resizeMode="cover"
                style={styles.userMarkerAvatar}
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  clusterMarker: {
    width: 80,
    height: 80,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
  userMarkerAvatar: {
    aspectRatio: 1,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
});
