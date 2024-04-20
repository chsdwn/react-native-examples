import { FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ringColors = ['#C913B9', '#F9373F', '#FECD00'];
const users = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: `user-${i}`,
    imageUrl: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? 'men' : 'women'
    }/${i}.jpg`,
  }));

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <LinearGradient colors={ringColors} style={styles.ringGradient}>
            <View style={styles.ringBorder}>
              <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
            </View>
          </LinearGradient>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const gradientDegree = '45deg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  ringGradient: {
    padding: 3,
    borderRadius: 9999,
    transform: [{ rotate: gradientDegree }],
  },
  ringBorder: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 9999,
    transform: [{ rotate: `-${gradientDegree}` }],
  },
  avatar: {
    width: 86,
    aspectRatio: 1,
    borderRadius: 9999,
  },
  listContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
});
