import {cores} from '@utils';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';

interface props {
  textBtn: string;
  onClick: any;
  disabled: boolean;
  loading: boolean;
}

export function Button({
  textBtn,
  onClick,
  disabled,
  loading,
}: props): React.ReactElement {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        styles.areaBtn,
        {backgroundColor: disabled ? cores.principalDisabled : cores.principal},
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
    </TouchableOpacity>
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
