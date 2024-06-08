import { Text, TextProps } from 'react-native';

export const AppText = (props: TextProps) => {
  return <Text numberOfLines={1} {...props} />;
};
