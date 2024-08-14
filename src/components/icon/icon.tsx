import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {
  ArrowNext,
  ArrowPrev,
  Document,
  Exit,
  EyeOff,
  EyeOn,
  Lock,
} from '@assets';

export interface IconProps {
  name: IconName;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}
export function Icon({name, onPress, containerStyle}: IconProps) {
  const SVGIcon = iconRegistry[name];

  if (onPress) {
    return (
      <Pressable
        style={containerStyle}
        onPress={() => {
          onPress();
        }}
        hitSlop={10}>
        <SVGIcon />
      </Pressable>
    );
  } else {
    return <SVGIcon />;
  }
}

const iconRegistry = {
  eyeOff: EyeOff,
  eyeOn: EyeOn,
  lock: Lock,
  document: Document,
  arrowNext: ArrowNext,
  arrowPrev: ArrowPrev,
  exit: Exit,
};

type IconType = typeof iconRegistry;

export type IconName = keyof IconType;
