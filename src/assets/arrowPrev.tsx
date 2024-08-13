import React from 'react';
import {Path, Svg} from 'react-native-svg';

export function ArrowPrev(): React.ReactElement {
  return (
    <Svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <Path
        d="M7 1L1 7L7 13"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
