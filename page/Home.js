import * as React from 'react';
import {
  Alert,
  RefreshControl,
  Keyboard,
  Platform,
  Vibration,
} from 'react-native';

import {
  Text,
  View,
  Container,
  TextInput,
  Button,
  FlatList,
  Inputs,
  List,
} from '../styles';

import {useTheme} from 'styled-components/native'

import {
  getData,
  storeData,
  saveTodo,
  clearAllTodos,
  removeTodo,
} from '../lib/todos';

import Copyright from '../components/copyright';

export default function App() {
  const SIMPLE_VIBRATION_TIME = 50;

  const theme = useTheme()

  const [DataTodos, setDataTodos] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(true);
  const [newTodo, setNewTodo] = React.useState('');
  const inputRef = React.useRef(null);

  function AlertError(e) {
    Alert.alert(
      `Error`,
      `Ocorreu um erro.
      ${e.message && '`' + e.message + '`'}`
    );
  }

  const getAllTodos = React.useCallback(() => {
    setRefreshing(true);
    getData()
      .then(({ data, error }) => {
        setRefreshing(false);
        if (!error) setDataTodos(data || []);
        else AlertError(error);
      })
      .catch(AlertError);
  }, [setDataTodos]);

  React.useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return (
    <Container>
      <List onPress={Keyboard.dismiss}>
        <>
          {DataTodos.length > 0 ? (
            <Text
              onPress={() => {
                Vibration.vibrate(SIMPLE_VIBRATION_TIME * 2);
                clearAllTodos().then(() => getAllTodos());
              }}>
              Seus Todos
            </Text>
          ) : (
            <Text>Nenhum Todo</Text>
          )}
          <FlatList
            data={DataTodos}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getAllTodos} />
            }
            keyExtractor={(todo) => String(todo.id || todo)}
            renderItem={({ item: todo }) => {
              return (
                <Text
                  $isTodo
                  onPress={() => {
                    console.log('Press', todo);
                    Vibration.vibrate(SIMPLE_VIBRATION_TIME);
                    removeTodo(todo).then(({ ok }) => ok && getAllTodos());
                  }}
                  onLongPress={() => {
                    console.log('LongPress', todo);
                    Vibration.vibrate(SIMPLE_VIBRATION_TIME);
                    removeTodo(todo).then(({ ok }) => ok && getAllTodos());
                  }}>
                  > {todo.title || todo}
                </Text>
              );
            }}
          />
        </>
      </List>
      <Inputs behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <TextInput
          autoCapitalize="words"
          clearButtonMode="while-editing"
          placeholder="Texto do todo"
          value={newTodo}
          onChangeText={(e) => setNewTodo(e)}
          ref={inputRef}
        />
        <Button
          color={theme.primary}
          title="Adicionar um novo todo"
          accessibilityLabel="Adicionar um novo todo"
          onPress={(e) => {
            if (newTodo) {
              console.log(`New Todo: ${newTodo}`);
              saveTodo(newTodo)
                .then(({ ok, error }) => {
                  if (ok) {
                    getAllTodos();
                    setNewTodo('');
                    Keyboard.dismiss();
                  } else AlertError(error);
                })
                .catch(AlertError);
            } else {
              Alert.alert(
                `Para adicionar um novo todo, você deve escrever ele`
              );
              inputRef?.current?.focus();
            }
          }}
        />
        <Copyright />
      </Inputs>
    </Container>
  );
}
