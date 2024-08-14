import {Button, Icon} from '@components';
import {AgendamentoService} from '@domain';
import {AppPacienteScreenProps} from '@routes';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {cores, nomesMeses} from '@utils';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Rating} from 'react-native-ratings';

export function AvaliarAtendimentoScreen({
  navigation,
  route,
}: AppPacienteScreenProps<'avaliarAtendimentoScreen'>): React.ReactElement {
  const {hora_inicio, hora_fim, dia, mes, ano, data, usuario, id, avaliacao} =
    route.params.agendamento;
  const [valueRating, setValueRating] = useState<number>(0);
  const queryClient = useQueryClient();

  function ratingCompleted(rating: number) {
    setValueRating(rating);
  }
  const {mutate} = useMutation({
    mutationFn: async () => {
      const response = await AgendamentoService.updateAvaliacao(
        valueRating,
        id,
      );
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
        queryKey: ['agendamentoPaciente'],
        refetchType: 'active',
      });
    },
  });
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
            {dia} de {nomesMeses[Number(mes)]} de {ano}
          </Text>
          <Text style={styles.textInformation}>
            <Text style={styles.titleInformation}>Horario de inicio: </Text>
            {hora_inicio}:00
          </Text>
          <Text style={styles.textInformation}>
            <Text style={styles.titleInformation}>Horario de fim: </Text>
            {hora_fim}:00
          </Text>
          <Text style={styles.textInformation}>
            <Text style={styles.titleInformation}>Paciente: </Text>
            {usuario.nome}
          </Text>
          <Text style={styles.textInformation}>
            <Text style={styles.titleInformation}>Identificador: </Text>
            {usuario.identificador}
          </Text>
        </>
      )}
      <View style={styles.spacingView} />
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        onFinishRating={ratingCompleted}
        startingValue={avaliacao ? avaliacao : 0}
      />
      <View style={styles.spacingView} />
      <Button textBtn={'Avaliar'} bgColor={cores.vaga} onClick={mutate} />
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    backgroundColor: cores.corDeFundo,
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
