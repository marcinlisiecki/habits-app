import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";

export const StyledHeader = styled.SafeAreaView`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding-top: ${Platform.OS == "android" ? StatusBar.currentHeight : 0}px;

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
