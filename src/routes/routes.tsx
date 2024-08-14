import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AuthStack} from './authStack.routes';
import {useSelector} from 'react-redux';
import {RootState} from '@redux';
import {AppStackFuncionario} from './appFuncionarioStack.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppPacienteStack} from './appPacienteStack.routes';

export function Router() {
  const [logged, setLogged] = useState<boolean>(false);
  const reduxLogged = useSelector((state: RootState) => state.login.logged);
  const reduxTipo = useSelector((state: RootState) => state.login.tipo);

  useEffect(() => {
    const fetchInitialValue = async () => {
      try {
        const loggedAsyncStorage = await AsyncStorage.getItem('logged');

        if (loggedAsyncStorage === 'true') {
          console.log('true');
          setLogged(true);
        } else {
          console.log('false');
          setLogged(reduxLogged);
        }
      } catch (error) {
        console.log('Erro ao obter o valor do AsyncStorage:', error);
      }
    };

    fetchInitialValue();
  }, [reduxLogged]);
  return (
    <NavigationContainer>
      {logged ? (
        reduxTipo === 'F' ? (
          <AppStackFuncionario />
        ) : (
          <AppPacienteStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
