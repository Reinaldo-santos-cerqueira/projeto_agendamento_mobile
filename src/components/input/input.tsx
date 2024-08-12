import {cores, formatCPF} from '@utils';
import React, {useState} from 'react';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon, IconName} from '@components';

interface propsInput {
  title: string;
  icon: IconName;
  cpf?: boolean;
  setValue?: any;
  placeHolder: string;
  password?: boolean;
}

export function Input<FormType extends FieldValues>({
  control,
  name,
  rules,
  title,
  setValue,
  icon,
  cpf,
  placeHolder,
  password,
}: propsInput & UseControllerProps<FormType>) {
  const [securityText, setSecurityText] = useState<boolean>(true);
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({field}) => {
        return (
          <View style={styles.contorno}>
            <Text>{title}</Text>
            <View style={styles.areaInput}>
              <Icon name={icon} />
              <TextInput
                placeholder={placeHolder}
                style={styles.input}
                value={field.value}
                secureTextEntry={securityText}
                onChangeText={(value: string) => {
                  if (cpf) {
                    const formattedCPF = formatCPF(value);
                    setValue('cpf', formattedCPF, {shouldValidate: true});
                    field.onChange(formattedCPF);
                  } else {
                    field.onChange(value);
                  }
                }}
              />
              {password && (
                <Icon
                  onPress={() => {
                    setSecurityText(!securityText);
                  }}
                  name={securityText ? 'eyeOn' : 'eyeOff'}
                />
              )}
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  contorno: {
    width: '100%',
    marginBottom: 10,
  },
  areaInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: cores.linhaInput,
    borderBottomWidth: 0.5,
  },
  input: {
    flex: 1,
  },
});
