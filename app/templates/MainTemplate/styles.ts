import styled from 'styled-components/native';

export const StyledWrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background.primary};
  height: 100%;
  width: 100%;
  padding: 12px;
`;

export const StyledContent = styled.View`
  padding: 20px;
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
