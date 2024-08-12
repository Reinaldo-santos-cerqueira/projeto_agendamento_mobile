import {Button, Input} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {cores} from '@utils';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {LoginSchema, loginSchema} from './loginSchema';

export function Login() {
  const [loading, setLoading] = useState(false);
  const {control, formState, handleSubmit, setValue} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: '',
      password: '',
    },
    mode: 'onChange',
  });

  const login = () => {
    async () => {};
  };

  return (
    <View style={styles.background}>
      <Text style={styles.titlePage}>Login</Text>
      <View style={styles.areaInputMessage}>
        <Input
          title="CPF"
          icon="document"
          name={'cpf'}
          control={control}
          setValue={setValue}
          cpf
          placeHolder="Digite seu cpf"
        />
        {formState.errors.cpf && (
          <Text style={styles.errorText}>{formState.errors.cpf.message}</Text>
        )}
      </View>
      <View style={styles.areaInputMessage}>
        <Input
          title="Senha"
          icon="lock"
          name={'password'}
          password
          control={control}
          placeHolder="Digite sua senha"
        />
        {formState.errors.password && (
          <Text style={styles.errorText}>
            {formState.errors.password.message}
          </Text>
        )}
      </View>
      <Button
        loading={loading}
        disabled={!formState.isValid}
        textBtn="Entrar"
        onClick={handleSubmit(login)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  areaInputMessage: {
    width: '100%',
    marginBottom: 20,
  },
  titlePage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  inputDescription: {
    fontSize: 16,
    color: cores.icone,
    fontWeight: 'regular',
  },
  errorText: {
    fontSize: 16,
    color: cores.marcado,
    fontWeight: 'regular',
  },
});
