import {Button, Icon} from '@components';
import {AgendamentoService} from '@domain';
import {AppFuncionarioScreenProps} from '@routes';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {cores, nomesMeses} from '@utils';
import React from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';

export function ConfirmarPresenca({
  route,
  navigation,
}: AppFuncionarioScreenProps<'confirmarPresencaScreen'>): React.ReactElement {
  const id = route.params.agendamentoId;
  const queryClient = useQueryClient();

  const {error, isLoading, data} = useQuery({
    queryKey: ['agendamentoGetById'],
    queryFn: async () => {
      const response = await AgendamentoService.getById(id);

      return response;
    },
  });

  const compareu = useMutation({
    mutationFn: async () => {
      const response = await AgendamentoService.updateComparecer(true, id);

      return response;
    },
    onError: () => {
      Alert.alert(
        'Não atualizado entre em contato com o provedor do sistemas',
        '',
        [{text: 'OK', onPress: () => ''}],
      );
    },
    onSuccess: async () => {
      Alert.alert('Atulizado com sucesso', '', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
      await queryClient.invalidateQueries({
        queryKey: ['agendamentoGetByData'],
        refetchType: 'active',
      });
    },
  });

  const faltou = useMutation({
    mutationFn: async () => {
      const response = await AgendamentoService.updateComparecer(false, id);
      return response;
    },
    onError: () => {
      Alert.alert(
        'Não atualizado entre em contato com o provedor do sistemas',
        '',
        [{text: 'OK', onPress: () => ''}],
      );
    },
    onSuccess: async () => {
      Alert.alert('Atulizado com sucesso', '', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
      await queryClient.invalidateQueries({
        queryKey: ['agendamentoGetByData'],
        refetchType: 'active',
      });
    },
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={cores.texto} />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro: {error.message}</Text>
      </View>
    );
  } else if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={cores.texto} />
        <Text>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.headerArea}>
          <Icon
            name="arrowPrev"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.titleHeader}>Confrimar agendamento</Text>
        </View>
        {data && (
          <>
            <Text style={styles.textInformation}>
              <Text style={styles.titleInformation}>Data: </Text>
              {data.dia} de {nomesMeses[Number(data.mes)]} de {data.ano}
            </Text>
            <Text style={styles.textInformation}>
              <Text style={styles.titleInformation}>Horario de inicio: </Text>
              {data.hora_inicio}:00
            </Text>
            <Text style={styles.textInformation}>
              <Text style={styles.titleInformation}>Horario de fim: </Text>
              {data.hora_fim}:00
            </Text>
            <Text style={styles.textInformation}>
              <Text style={styles.titleInformation}>Paciente: </Text>
              {data.usuario.nome}
            </Text>
            <Text style={styles.textInformation}>
              <Text style={styles.titleInformation}>Identificador: </Text>
              {data.usuario.identificador}
            </Text>
          </>
        )}
        <View style={styles.spacingView} />
        <Button
          textBtn="Compareceu"
          onClick={() => compareu.mutate()}
          bgColor={cores.vaga}
        />
        <View style={styles.spacingView} />
        <Button
          textBtn="Não compareceu"
          onClick={() => faltou.mutate()}
          bgColor={cores.marcado}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    height: 20,
  },
  titleInformation: {
    fontWeight: 'bold',
  },
  textInformation: {
    fontSize: 16,
    color: cores.texto,
  },
  headerArea: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  titleHeader: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  areaItem: {
    flex: 1,
    margin: 10,
  },
});
