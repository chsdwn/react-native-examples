import { useNavigation } from '@react-navigation/core';

import { PostRouteNavigationProp } from '@/routes/PostRoute';

export const usePostNavigation = () => {
  const navigation = useNavigation<PostRouteNavigationProp>();
  return navigation;
};
