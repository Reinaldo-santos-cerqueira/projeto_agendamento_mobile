import React from 'react';
import {Path, Svg} from 'react-native-svg';

export function Document(): React.ReactElement {
  return (
    <Svg width="25px" height="25px" viewBox="0 -0.5 25 25" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.5 10H18.5"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M15.5 13H18.5"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
