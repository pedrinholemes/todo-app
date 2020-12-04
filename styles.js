import styled from 'styled-components/native';

export const Text = styled.Text`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 16px;
  color: ${p=>p.theme.text};
  ${(p) =>
    p.$isTodo &&
    `
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 8px;
  `}
`;

export const Container = styled.SafeAreaView`
   flex: 1;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   padding: 64px 32px;
   color: ${p=>p.theme.text};
   background-color: ${p=>p.theme.background};
`;

export const View = styled.View``;

export const TextInput = styled.TextInput`
  padding: 8px 12px;
  margin: 8px;
  color: ${p=>p.theme.text};
  border-radius: 4px;
  border: 1px solid ${p=>p.theme.text};
  background-color: rgba(144,144,144,0.25)
`;

export const Button = styled.Button`
  margin: 16px;
  background-color: ${p=>p.theme.primary};
  color: ${p=>p.theme.text};
`;

export const List = styled.TouchableWithoutFeedback`
  width: 80%;
  height: 60%;
  padding-bottom: 16px;
`;

export const Inputs = styled.KeyboardAvoidingView`
  width: 80%;
  height: 20%;
  padding-top: 16px;
`;

export const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;
