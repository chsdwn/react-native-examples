import { Image as ExpoImage, ImageProps } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Image = (props: ImageProps) => {
  return (
    <ExpoImage
      placeholder={blurhash}
      transition={1000}
      contentFit="cover"
      {...props}
    />
  );
};
