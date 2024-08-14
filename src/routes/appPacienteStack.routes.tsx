import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AgendamentoPacienteScreen, AvaliarAtendimentoScreen} from '@screen';
import {AgendamentoComUsuario} from '@domain';

export type AppStackPacienteParams = {
  agendamentoPacienteScreen: undefined;
  avaliarAtendimentoScreen: {
    agendamento: AgendamentoComUsuario;
  };
};

const Stack = createNativeStackNavigator<AppStackPacienteParams>();

export function AppPacienteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
      initialRouteName="agendamentoPacienteScreen">
      <Stack.Screen
        component={AgendamentoPacienteScreen}
        name={'agendamentoPacienteScreen'}
      />
      <Stack.Screen
        component={AvaliarAtendimentoScreen}
        name={'avaliarAtendimentoScreen'}
      />
    </Stack.Navigator>
  );
}
