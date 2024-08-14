import {Button, Icon} from '@components';
import {AgendamentoComUsuario, AgendamentoService} from '@domain';
import {useLogout} from '@hooks';
import {AppPacienteScreenProps} from '@routes';
import {useQuery} from '@tanstack/react-query';
import {cores, nomesMeses} from '@utils';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function AgendamentoPacienteScreen({
  navigation,
}: AppPacienteScreenProps<'agendamentoPacienteScreen'>): React.ReactElement {
  const handleLogout = useLogout();
  const {error, isLoading, data} = useQuery({
    queryKey: ['agendamentoPaciente'],
    queryFn: async () => {
      const response = await AgendamentoService.getByUserId();
      return response;
    },
  });

  const renderItem = (item: ListRenderItemInfo<AgendamentoComUsuario>) => {
    return (
      <View style={styles.spacingView}>
        <Button
          textBtn={
            item.item.dia +
            ' de ' +
            nomesMeses[Number(item.item.mes)] +
            ' de ' +
            item.item.ano +
            ' - ' +
            item.item.hora_inicio +
            ' ás ' +
            item.item.hora_fim
          }
          bgColor={cores.vaga}
          onClick={() => {
            navigation.push('avaliarAtendimentoScreen', {
              agendamento: item.item,
            });
          }}
        />
      </View>
    );
  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={cores.texto} />
        <Text>Carregando...</Text>
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro: {error.message}</Text>
        <Icon
          onPress={() => {
            handleLogout();
          }}
          name={'exit'}
          containerStyle={styles.btnExit}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.headerArea}>
          <Text style={styles.titleHeader}>Agendamentos</Text>
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={renderItem}
        />
        <Icon
          onPress={() => {
            handleLogout();
          }}
          name={'exit'}
          containerStyle={styles.btnExit}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    padding: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacingView: {
    marginBottom: 20,
  },
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleHeader: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btnExit: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
});
