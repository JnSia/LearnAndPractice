import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { theme } from './colors';

const STORAGE_KEY = '@toDos';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const [modal, setModal] = useState(false);
  const [modify, setModify] = useState('');
  const [modifyKey, setModifyKey] = useState();

  useEffect(() => {
    loadScreen();
    loadToDos();
  }, []);

  const travel = () => {
    setWorking(false);
    saveScreen(false);
  };
  const work = () => {
    setWorking(true);
    saveScreen(true);
  };
  const onChangeText = (payload) => setText(payload);
  const onModifyText = (payload) => setModify(payload);

  const saveScreen = async (screen) => {
    try {
      const jsonValue = JSON.stringify(screen);
      await AsyncStorage.setItem('@screen', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadScreen = async () => {
    try {
      const setScreen = await AsyncStorage.getItem('@screen');
      setScreen != null ? setWorking(JSON.parse(setScreen)) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const saveToDos = async (toSave) => {
    try {
      const jsonValue = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadToDos = async () => {
    try {
      const setData = await AsyncStorage.getItem(STORAGE_KEY);
      setData != null ? setToDos(JSON.parse(setData)) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const addToDo = async () => {
    if (text === '') {
      return;
    }

    const newToDos = { ...toDos, [Date.now()]: { text, working, complete } };

    setToDos(newToDos);
    await saveToDos(newToDos);

    setText('');
  };

  const deleteToDo = async (key) => {
    Alert.alert('Delete To Do', 'Are you Sure?', [
      { text: 'Cancel' },
      {
        text: "I'm sure",
        style: 'destructive',
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };

  const modifyToDo = async (key) => {
    setModifyKey(key);

    if (modal) {
      const newToDos = { ...toDos };

      newToDos[modifyKey].text = modify;

      setToDos(newToDos);
      await saveToDos(newToDos);

      setModal(false);
      setModify('');
    } else {
      setModal(true);
    }
  };

  const modalClose = () => {
    setModal(false);
    setModify('');
  };

  const completeToDo = async (key) => {
    const newToDos = { ...toDos };

    newToDos[key].complete = true;
    console.log(newToDos[key]);

    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  const cancelToDo = async (key) => {
    const newToDos = { ...toDos };

    newToDos[key].complete = false;
    console.log(newToDos[key]);

    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ fontSize: 38, fontWeight: '600', color: working ? 'white' : theme.grey }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ fontSize: 38, fontWeight: '600', color: working ? theme.grey : 'white' }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder={working ? 'Add a To Do!' : 'Where do you want to go?'}
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        returnKeyType="done"
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View key={key} style={styles.toDo}>
              {toDos[key].complete ? (
                <Text
                  style={{ ...styles.toDoText, color: 'grey', textDecorationLine: 'line-through' }}
                >
                  {toDos[key].text}
                </Text>
              ) : (
                <Text style={{ ...styles.toDoText, color: 'white' }}>{toDos[key].text}</Text>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {toDos[key].complete ? (
                  <TouchableOpacity style={styles.icons} onPress={() => cancelToDo(key)}>
                    <AntDesign name="close" size={18} color={'white'} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.icons} onPress={() => completeToDo(key)}>
                    <AntDesign name="check" size={18} color={'white'} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.icons} onPress={() => modifyToDo(key)}>
                  <AntDesign name="edit" size={18} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons} onPress={() => deleteToDo(key)}>
                  <AntDesign name="delete" size={18} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
      <Modal stlye={styles.modal} isVisible={modal} onBackButtonPress={() => modalClose()}>
        <TextInput
          style={styles.input}
          placeholder={'Modify text!'}
          value={modify}
          onChangeText={onModifyText}
          onSubmitEditing={modifyToDo}
          returnKeyType="done"
        ></TextInput>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toDoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icons: {
    marginLeft: 20,
  },
});
