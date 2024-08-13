import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Agendamento, ConfirmarPresenca, CriarAgendamento} from '@screen';

export type AppStackParams = {
  agendamentoScreen: undefined;
  criarAgendamentoScreen: {
    hora_fim: string;
    hora_inicio: string;
    data: {
      ano: number;
      mes: number;
      dia: number;
    };
  };
  confirmarPresencaScreen: {
    agendamentoId: number;
  };
};

const Stack = createNativeStackNavigator<AppStackParams>();

export function AppStack() {
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
