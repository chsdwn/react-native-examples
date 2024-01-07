import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronLeft = (props: SvgProps) => {
  return (
    <Svg width={10} height={18} fill="none" {...props}>
      <Path
        fill="currentColor"
        d="M9.577 1.28A.75.75 0 108.517.22L.706 8.03a1 1 0 000 1.413l7.81 7.81a.75.75 0 001.06-1.061L2.121 8.736 9.577 1.28z"
      />
    </Svg>
  );
};
