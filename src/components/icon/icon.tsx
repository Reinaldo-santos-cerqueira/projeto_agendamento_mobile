import React from 'react';
import {Pressable} from 'react-native';
import {ArrowNext, ArrowPrev, Document, EyeOff, EyeOn, Lock} from '@assets';

export interface IconProps {
  name: IconName;
  onPress?: () => void;
}
export function Icon({name, onPress}: IconProps) {
  const SVGIcon = iconRegistry[name];

  if (onPress) {
    return (
      <Pressable
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
};

type IconType = typeof iconRegistry;

export type IconName = keyof IconType;
