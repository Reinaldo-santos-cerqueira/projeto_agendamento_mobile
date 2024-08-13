import {Button, Icon} from '@components';
import {Agendamento as AgendamentoModel, AgendamentoService} from '@domain';
import {AppScreenProps} from '@routes';
import {useQuery} from '@tanstack/react-query';
import {cores} from '@utils';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';

interface horario {
  hora_inicio: string;
  hora_fim: string;
  id: number;
}

export function Agendamento({
  navigation,
}: AppScreenProps<'agendamentoScreen'>): React.ReactElement {
  const dataAtual = new Date();
  const [dia, setDia] = useState(dataAtual.getDate());
  const [mes, setMes] = useState(dataAtual.getMonth());
  const [ano, setAno] = useState(dataAtual.getFullYear());
  const [somaDia, setSomaDia] = useState(0);
  const dataCalc = new Date(dataAtual);

  const {error, isLoading, data} = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await AgendamentoService.getByData({
        dia,
        mes,
        ano,
      });
      return response;
    },
  });
  if (error) {
    console.log(error);
  }
  const nomesMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const horarios: horario[] = [
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

  function mudarDia(operation: 'add' | 'sub') {
    if (operation === 'add') {
      if (somaDia <= 30) {
        setSomaDia(somaDia + 1);
        dataCalc.setDate(dataAtual.getDate() + somaDia);
        setDia(dataCalc.getDate());
        setMes(dataCalc.getMonth());
        setAno(dataCalc.getFullYear());
      }
    } else {
      if (somaDia >= 0) {
        setSomaDia(somaDia - 1);
        dataCalc.setDate(dataAtual.getDate() + somaDia);
        setDia(dataCalc.getDate());
        setMes(dataCalc.getMonth());
        setAno(dataCalc.getFullYear());
      }
    }
  }
  const renderItem = (item: ListRenderItemInfo<horario>) => {
    let marcado = false;
    let bgColor = cores.vaga;
    data?.map((response: AgendamentoModel) => {
      if (
        response.hora_fim === item.item.hora_fim ||
        response.hora_inicio === item.item.hora_inicio
      ) {
        marcado = true;
        bgColor = cores.marcado;
      }
    });
    const onclick = () => {
      if (marcado) {
        navigation.navigate('confirmarPresencaScreen', {agendamentoId: 1});
      } else {
        navigation.navigate('criarAgendamentoScreen', {
          hora_fim: item.item.hora_fim,
          hora_inicio: item.item.hora_inicio,
          data: {
            ano,
            mes,
            dia,
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
          onClick={onclick}
        />
      </View>
    );
  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={cores.texto} />
        <Text>C</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro {error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.background}>
      <View style={styles.headerArea}>
        <Icon name="arrowPrev" onPress={() => mudarDia('sub')} />
        <Text style={styles.titleHeader}>
          {dia} de {nomesMeses[mes]} de {ano}
        </Text>
        <Icon name="arrowNext" onPress={() => mudarDia('add')} />
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        data={horarios}
        renderItem={renderItem}
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
});
