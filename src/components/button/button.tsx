import {cores} from '@utils';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Pressable} from 'react-native';

interface props {
  textBtn: string;
  onClick: any;
  disabled?: boolean;
  loading?: boolean;
  bgColor?: string;
}

export function Button({
  textBtn,
  onClick,
  disabled,
  loading,
  bgColor,
}: props): React.ReactElement {
  return (
    <Pressable
      disabled={disabled || loading}
      style={[
        styles.areaBtn,
        {
          backgroundColor: !bgColor
            ? disabled
              ? cores.principalDisabled
              : cores.principal
            : bgColor,
        },
      ]}
      onPress={onClick}>
      {loading ? (
        <ActivityIndicator color={cores.texto} size="large" />
      ) : (
        <Text
          style={[
            styles.fontBtn,
            {
              color: disabled ? cores.icone : cores.texto,
            },
          ]}>
          {textBtn}
        </Text>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  areaBtn: {
    width: '100%',
    height: 50,
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBtn: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
