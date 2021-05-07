import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';

export const StyledHeader = styled.SafeAreaView`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding-top: ${Platform.OS == 'android' ? StatusBar.currentHeight : 0}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderColors.primary};
`;

export const StyledHeaderContent = styled.View`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const StyledStatCardsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;

  padding: 10px 0 50px 0;
`;

export const StyledCardWrapper = styled.View`
  display: flex;
  padding: 16px 10px 12px 10px;
  margin-bottom: 12px;

  min-height: 110px;

  width: 48%;
`;

export const StyledCardContent = styled.View`
  flex-direction: row;
  flex: 2;
  display: flex;
  margin-top: 6px;

  align-items: center;
  justify-content: center;
`;
