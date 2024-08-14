import {Button, Icon} from '@components';
import {AgendamentoService, Usuario, usuarioService} from '@domain';
import {AppFuncionarioScreenProps} from '@routes';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {cores, nomesMeses} from '@utils';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface userValues {
  texto: string;
  id: string;
}

export function CriarAgendamento({
  route,
  navigation,
}: AppFuncionarioScreenProps<'criarAgendamentoScreen'>): React.ReactElement {
  const {
    hora_fim,
    hora_inicio,
    data: {dia, mes, ano},
  } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [textBtn, setTextBtn] = useState<userValues>({
    texto: 'Escolha o paciente...',
    id: '',
  });
  const queryClient = useQueryClient();

  const agendar = useMutation({
    mutationFn: async () => {
      const response = await AgendamentoService.create({
        usuario_id: textBtn.id,
        hora_inicio: hora_inicio,
        hora_fim: hora_inicio,
        data: ano + '-' + mes + '-' + dia,
        avaliacao: 0,
      });
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
  const {error, isLoading, data} = useQuery({
    queryKey: ['getAllUsuarios'],
    queryFn: async () => {
      const response = await usuarioService.getAll();

      return response;
    },
  });

  const renderItem = (item: ListRenderItemInfo<Usuario>) => {
    const clickItem = () => {
      setTextBtn({
        id: item.item.id,
        texto: item.item.identificador + ' - ' + item.item.nome,
      });
      setModalVisible(!modalVisible);
    };
    return (
      <Pressable style={styles.btnModalInterno} onPress={clickItem}>
        <Text style={styles.textInformation}>
          {item.item.identificador} - {item.item.nome}
        </Text>
      </Pressable>
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
        {data && (
          <Pressable
            style={styles.btnModal}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text>{textBtn.texto}</Text>
          </Pressable>
        )}
        <View style={styles.spacingView} />
        <Button
          textBtn="Agendar"
          onClick={() => agendar.mutate()}
          bgColor={cores.vaga}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalArea}>
            <View style={styles.modalAreaInterna}>
              <FlatList data={data} renderItem={renderItem} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
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
  btnModal: {
    marginVertical: 10,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: cores.contraste,
  },
  modalArea: {
    flex: 1,
    width: '100%',
    display: 'flex',
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalAreaInterna: {
    width: '90%',
    height: '60%',
    backgroundColor: cores.corDeFundo,
    borderRadius: 16,
    padding: 20,
  },
  btnModalInterno: {
    marginVertical: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
