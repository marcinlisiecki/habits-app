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

export const StyledCalendarWrapper = styled.View`
  margin: 10px 4px;
`;

export const StyledCalendarHeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 12px 40px 12px;
`;

export const StyledCalendarWeekdaysWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledCalendarWeekday = styled.Text`
  width: 14.28%;
  min-width: 14.28%;
  max-width: 14.28%;
  text-align: center;

  color: ${({ theme }) => theme.colors.text.special};
  font-weight: ${({ theme }) => theme.typography.fontWeight.black};
`;

export const StyledCalendarDaysWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  justify-content: flex-start;
`;

interface StyledCalendarDayProps {
  color?: 'danger' | 'warning' | 'success' | 'none';
}

export const StyledCalendarDay = styled.View<StyledCalendarDayProps>`
  width: 12.7%;
  min-width: 12.7%;
  max-width: 12.7%;

  background-color: ${({ theme, color }) =>
    color && (color === 'success' || color === 'warning')
      ? theme.colors[color][400]
      : 'transparent'};

  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 12px;
  margin: 6px 0.78%;
`;
