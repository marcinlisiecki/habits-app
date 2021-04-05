import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  padding: 10px 30px;
  width: auto;
  display: flex;
  margin-top: 20px;
  border-radius: 8px;
`;

export const StyledText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.Montserrat[500]};
`;
