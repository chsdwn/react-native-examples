import { ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ShimmerPlaceholderProps,
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';

const LinearShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface Props extends ShimmerPlaceholderProps {
  style?: ViewProps['style'];
  contentStyle?: ViewProps['style'];
  shimmerStyle?: ViewProps['style'];
}

export const ShimmerPlaceholder = (props: Props) => (
  <LinearShimmerPlaceholder {...props} />
);
