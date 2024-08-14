import {Button, Input} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {cores} from '@utils';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {LoginSchema, loginSchema} from './loginSchema';
import {UsuarioLogin, usuarioService} from '@domain';
import {useDispatch} from 'react-redux';
import {AppDispatch, login} from '@redux';
import {useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const {control, formState, handleSubmit, setValue} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: '',
      password: '',
    },
    mode: 'onChange',
  });
  const loginApp = (data: {cpf: string; password: string}) => {
    mutate(data);
  };
  const {mutate} = useMutation<
    UsuarioLogin,
    Error,
    {cpf: string; password: string}
  >({
    mutationFn: async ({cpf, password}: LoginSchema) => {
      const response = await usuarioService.login({
        identificador: cpf,
        senha: password,
      });
      console.log(response);

      return response;
    },
    onError: error => {
      if (error) {
        Alert.alert(error.message, '');
      }
    },
    onSuccess: async data => {
      if (data) {
        await AsyncStorage.setItem('logged', 'true');
        await AsyncStorage.setItem('token', data.token);
        dispatch(login({token: data.token, tipo: data.user.tipo}));
      }
    },
  });

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
        disabled={!formState.isValid}
        textBtn="Entrar"
        onClick={handleSubmit(loginApp)}
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
