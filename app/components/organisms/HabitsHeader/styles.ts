import styled from 'styled-components/native';

export const StyledWrapper = styled.SafeAreaView`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderColors.primary};
`;

export const StyledContent = styled.View`
  padding: 0 0 20px 0;
`;

export const StyledBar = styled.View`
  padding: 20px 18px 30px 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCalendarItem = styled.TouchableOpacity`
  margin: 0 20px;
`;
