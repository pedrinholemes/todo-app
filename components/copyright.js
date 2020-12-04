import React, { useContext } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  Touchable,
  TouchableMixin,
} from 'react-native';
import styled from 'styled-components/native';

import ThemeContext from '../lib/theme';

import { CopyrightAlert } from '../lib/utils';

export default function CopyrightText() {
  return (
    <TouchableOpacity onPress={CopyrightAlert}>
      <Text>By Pedro Henrique</Text>
    </TouchableOpacity>
  );
}

const Text = styled.Text`
  font-size: 14px;
  margin: 8px;
  padding: 12px;
  width: 100%;
  text-align:center;
  color:${(p) => p.theme.text};
`;
