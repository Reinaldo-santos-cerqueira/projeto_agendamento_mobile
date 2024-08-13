import React from 'react';
import {Path, Svg} from 'react-native-svg';

export function ArrowNext(): React.ReactElement {
  return (
    <Svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <Path
        d="M1 13L7 7L1 1"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
