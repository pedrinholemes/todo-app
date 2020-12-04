import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

let interval = setTimeout(CopyrightAlert, 2 * 60 * 60 * 1000);

export const CopyrightAlert = () => {
  const buttons = [];
  if (typeof interval !== 'undefined')
    buttons.push({
      text: 'Depois :)',
      onPress: async () => {
        interval = setTimeout(CopyrightAlert, 30 * 60 * 1000);
      },
    });
  buttons.push({
    text: 'Não',
    onPress: async () => {
      clearInterval(interval);
      interval = undefined;
    },
  });
  buttons.push({
    text: 'Sim',
    onPress: async () => {
      await Linking.openURL('https://linktr.ee/pedrinholemes');
      clearInterval(interval);
      interval = undefined;
    },
  });

  Alert.alert(
    'Olá',
    `Fiz este app em uma tarde então talvez ele esteja bem ruim.
Me siga nas redes-sociais :)`,
    buttons,
    {
      cancelable: true,
    }
  );
};
