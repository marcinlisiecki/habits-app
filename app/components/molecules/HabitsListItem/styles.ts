import styled from "styled-components/native";

export const StyledWrapper = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  min-width: 100%;
  padding: 16px;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.borderColors.primary};
`;
