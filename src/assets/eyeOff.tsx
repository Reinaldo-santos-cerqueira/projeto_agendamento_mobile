import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

export function EyeOff(): React.ReactElement {
  return (
    <Svg width="25" height="22" viewBox="0 0 25 22" fill="none">
      <G clip-path="url(#clip0_1_70)">
        <Path
          d="M9.77385 12.6685C8.85313 11.7478 8.85313 10.254 9.77385 9.3314C10.6946 8.41069 12.1884 8.41069 13.111 9.3314C14.0317 10.2521 14.0317 11.746 13.111 12.6685C12.1884 13.5911 10.6955 13.5911 9.77385 12.6685Z"
          stroke="#A2A2A7"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.7783 11.0023C18.7783 11.5204 18.6545 12.033 18.4152 12.5053C17.1799 14.9392 14.4508 16.5046 11.4419 16.5046C8.43311 16.5046 5.70398 14.9392 4.46871 12.5053C4.22936 12.033 4.10556 11.5204 4.10556 11.0023C4.10556 10.4841 4.22936 9.9715 4.46871 9.49922C5.70398 7.06538 8.43311 5.49997 11.4419 5.49997C14.4508 5.49997 17.1799 7.06538 18.4152 9.49922C18.6545 9.9715 18.7783 10.4841 18.7783 11.0023Z"
          stroke="#A2A2A7"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Path d="M20.5343 3L12.1612 10.5L3.78806 18" stroke="#A2A2A7" />
      <Defs>
        <ClipPath id="clip0_1_70">
          <Rect
            width="24.5612"
            height="22"
            fill="white"
            transform="translate(0.438812)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
