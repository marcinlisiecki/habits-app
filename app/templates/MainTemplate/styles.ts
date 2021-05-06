import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const StyledWrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background.primary};
  height: 100%;
  width: 100%;
  padding: 12px;
  flex: 1;
`;

export const StyledContent = styled.View`
  padding: ${Platform.OS === 'ios' ? '0 10px' : '0'};
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  flex: 1;
`;
