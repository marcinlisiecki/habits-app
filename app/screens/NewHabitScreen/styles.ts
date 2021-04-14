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

export const StyledSelectRepeatWrapper = styled.View`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderColors.primary};
  height: 100px;
  border-radius: 10px;

  overflow: hidden;
`;

export const StyledSelectRepeatTop = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;

  overflow: hidden;
`;

interface SelectRepeatBottomProps {
  isSelected?: boolean;
}

export const StyledSelectRepeatBottom = styled.TouchableOpacity<SelectRepeatBottomProps>`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderColors.primary};

  background-color: ${({ theme, isSelected = false }) =>
    isSelected ? theme.colors.primary[500] : "transparent"};
`;

interface SelectRepeatDayProps {
  isSelected?: boolean;
  roundLeft?: boolean;
  roundRight?: boolean;
}

export const StyledSelectRepeatDay = styled.TouchableOpacity<SelectRepeatDayProps>`
  padding: 12px;
  text-align: center;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.Montserrat[700]};

  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.borderColors.primary};

  border-top-left-radius: ${({ roundLeft = false }) =>
    roundLeft ? "10px" : "0px"};
  border-top-right-radius: ${({ roundRight = false }) =>
    roundRight ? "10px" : "0px"};

  background-color: ${({ theme, isSelected = false }) =>
    isSelected ? theme.colors.primary[500] : "transparent"};
`;
