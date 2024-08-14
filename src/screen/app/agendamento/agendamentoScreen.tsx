import {Button, Icon} from '@components';
import {Agendamento as AgendamentoModel, AgendamentoService} from '@domain';
import {AppFuncionarioScreenProps} from '@routes';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {cores, nomesMeses} from '@utils';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';
import {useLogout} from '@hooks';

interface Horario {
  hora_inicio: string;
  hora_fim: string;
  id: number;
}

export function Agendamento({
  navigation,
}: AppFuncionarioScreenProps<'agendamentoScreen'>): React.ReactElement {
  const dataAtual = new Date();
  const queryClient = useQueryClient();
  const handleLogout = useLogout();

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const horarios: Horario[] = [
    {id: 1, hora_inicio: '07', hora_fim: '08'},
    {id: 2, hora_inicio: '08', hora_fim: '09'},
    {id: 3, hora_inicio: '09', hora_fim: '10'},
    {id: 4, hora_inicio: '10', hora_fim: '11'},
    {id: 5, hora_inicio: '11', hora_fim: '12'},
    {id: 6, hora_inicio: '13', hora_fim: '14'},
    {id: 7, hora_inicio: '14', hora_fim: '15'},
    {id: 8, hora_inicio: '15', hora_fim: '16'},
    {id: 9, hora_inicio: '16', hora_fim: '17'},
    {id: 10, hora_inicio: '17', hora_fim: '18'},
  ];

  const {error, isLoading, data} = useQuery({
    queryKey: ['agendamentoGetByData', dataSelecionada],
    queryFn: async () => {
      const response = await AgendamentoService.getByData({
        dia: dataSelecionada.getDate(),
        mes: dataSelecionada.getMonth() + 1,
        ano: dataSelecionada.getFullYear(),
      });
      return response;
    },
  });

  const mudarDia = async (operation: 'add' | 'sub') => {
    const novaData = new Date(dataSelecionada);
    if (
      operation === 'add' &&
      novaData <= new Date(dataAtual.setDate(dataAtual.getDate() + 1))
    ) {
      novaData.setDate(dataSelecionada.getDate() + 1);
    } else if (operation === 'sub' && novaData > new Date()) {
      novaData.setDate(dataSelecionada.getDate() - 1);
    }
    setDataSelecionada(novaData);
    await queryClient.invalidateQueries({
      queryKey: ['agendamentoGetByData'],
      refetchType: 'active',
    });
  };

  const renderItem = (item: ListRenderItemInfo<Horario>) => {
    let marcado = false;
    let bgColor = cores.vaga;
    let id: string;
    data?.forEach((response: AgendamentoModel) => {
      id = response.id;
      if (
        response.hora_fim === item.item.hora_fim ||
        response.hora_inicio === item.item.hora_inicio
      ) {
        marcado = true;
        bgColor = cores.marcado;
      }
    });

    const onClick = () => {
      if (marcado) {
        navigation.navigate('confirmarPresencaScreen', {
          agendamentoId: id,
        });
      } else {
        navigation.navigate('criarAgendamentoScreen', {
          hora_fim: item.item.hora_fim,
          hora_inicio: item.item.hora_inicio,
          data: {
            ano: dataSelecionada.getFullYear().toString(),
            mes: (dataSelecionada.getMonth() + 1).toString(),
            dia: dataSelecionada.getDate().toString(),
          },
        });
      }
    };

    return (
      <View style={styles.areaItem}>
        <Button
          textBtn={
            item.item.hora_inicio + ':00 ás ' + item.item.hora_fim + ':00'
          }
          bgColor={bgColor}
          onClick={onClick}
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
  }

  if (error) {
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
  }

  return (
    <View style={styles.background}>
      <View style={styles.headerArea}>
        <Icon name="arrowPrev" onPress={() => mudarDia('sub')} />
        <Text style={styles.titleHeader}>
          {dataSelecionada.getDate()} de{' '}
          {nomesMeses[dataSelecionada.getMonth()]} de{' '}
          {dataSelecionada.getFullYear()}
        </Text>
        <Icon name="arrowNext" onPress={() => mudarDia('add')} />
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        data={horarios}
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
  headerArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleHeader: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  areaItem: {
    flex: 1,
    margin: 10,
  },
  btnExit: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
