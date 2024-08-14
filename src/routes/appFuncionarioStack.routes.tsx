import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Agendamento, ConfirmarPresenca, CriarAgendamento} from '@screen';

export type AppStackFuncionarioParams = {
  agendamentoScreen: undefined;
  criarAgendamentoScreen: {
    hora_fim: string;
    hora_inicio: string;
    data: {
      ano: string;
      mes: string;
      dia: string;
    };
  };
  confirmarPresencaScreen: {
    agendamentoId: string;
  };
};

const Stack = createNativeStackNavigator<AppStackFuncionarioParams>();

export function AppStackFuncionario() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
      initialRouteName="agendamentoScreen">
      <Stack.Screen component={Agendamento} name={'agendamentoScreen'} />
      <Stack.Screen
        component={ConfirmarPresenca}
        name={'confirmarPresencaScreen'}
      />
      <Stack.Screen
        component={CriarAgendamento}
        name={'criarAgendamentoScreen'}
      />
    </Stack.Navigator>
  );
}
