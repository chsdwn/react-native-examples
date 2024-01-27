import { useRoute } from '@react-navigation/core';

import { PostDetailsRouteProp } from '@/routes/PostRoute';

export const usePostDetailsRoute = () => {
  const route = useRoute<PostDetailsRouteProp>();
  return route;
};
