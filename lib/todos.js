import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value = []) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@my-todos', jsonValue);
    return { ok: true };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@my-todos');
    return { data: jsonValue != null ? JSON.parse(jsonValue) : [] };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const saveTodo = async (todo) => {
  try {
    const { data: lastTodos } = await getData();

    const newTodo = {
      id: lastTodos.length,
      title: todo,
    };

    await storeData([...lastTodos, newTodo]);

    const { data: newTodos } = await getData();

    return { ok: true, data: newTodos };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const removeTodo = async (todo) => {
  return new Promise((resolve) => {
    const t = Alert.alert(
      'Você deseja excluir este TODO?',
      todo.title || todo,
      [
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const { data: lastTodos } = await getData();

              const newTodos = lastTodos.filter((currTodo) => {
                console.log(currTodo.id !== todo.id || currTodo !== todo);
                return currTodo.id !== todo.id;
              });

              await storeData([...newTodos]);

              const { data: newTodos1 } = await getData();

              resolve({ ok: true, data: newTodos1 });
            } catch (e) {
              console.error(e);
              throw e;
            }
          },
          style: 'default',
        },
        {
          text: 'Não',
          onPress: async () => {
            resolve({ ok: true });
          },
          style: 'cancel',
        },
      ]
    );
  });
};

export const clearAllTodos = () => {
  return new Promise((resolve) => {
    const t = Alert.alert(
      'Você deseja excluir todos os TODOS?',
      'Você tem certeza que deseja excluir todos os TODOS?',
      [
        {
          text: 'Não',
          onPress: async () => {
            resolve({ ok: true });
          },
          style: 'cancel',
        },
        {
          text: 'Sim, quero excluir!',
          onPress: async () => {
            try {
              const t = await AsyncStorage.setItem('@my-todos', '[]');
              resolve({ ok: true });
            } catch (e) {
              console.error('clearAllTodos', e);
              resolve({ ok: false, error: e });
            }
          },
          style: 'default',
        },
      ]
    );
  });
};
