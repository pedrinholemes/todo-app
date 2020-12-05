import * as React from 'react';
import { StatusBar } from 'react-native';
import ThemeContext, { Provider } from './lib/theme';

import Home from './pages/Home';

const themes = {
  light: {
    name: 'light',
    primary: 'rgb(33, 150, 243)',
    text: '#000',
    background: '#fff',
  },
  dark: {
    primary: 'rgb(243, 150, 33)',
    text: '#fff',
    background: '#000',
  },
};

function App() {
  const { theme } = React.useContext(ThemeContext)

  return (
    <>
      <StatusBar backgroundColor={theme.primary} />
      <Home />
    </>
  );
}


export default () => (
  <Provider themes={themes}>
    <App />
  </Provider>
)
