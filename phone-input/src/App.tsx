import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import countries from 'countries-phone-masks';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { formatWithMask } from 'react-native-mask-input';

export const App = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const countryCode = useMemo(() => country?.cca2 ?? 'TR', [country?.cca2]);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Converts "(###)###-####" to ["(", /\d/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
  // https://github.com/CaioQuirinoMedeiros/react-native-mask-input?tab=readme-ov-file#mask
  const mask = countries
    .find(({ iso }) => iso === countryCode)
    ?.mask?.split('')
    .map((maskItem) => (maskItem === '#' ? /\d/ : maskItem));
  const { masked } = formatWithMask({
    mask,
    text: phoneNumber,
  });

  const handleCountrySelect = (country: Country) => {
    setCountry(country);
    setPhoneNumber('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
        }}
      >
        <CountryPicker
          countryCode={countryCode}
          onSelect={handleCountrySelect}
          withAlphaFilter
          withCallingCode
          withCallingCodeButton
          withFilter
          withFlag
          containerButtonStyle={{ padding: 8 }}
        />
        <TextInput
          value={masked}
          onChangeText={setPhoneNumber}
          style={{
            flex: 1,
            borderLeftWidth: 1,
            borderLeftColor: '#ddd',
            fontSize: 16,
            padding: 8,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 16,
  },
});
