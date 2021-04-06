import styled from "styled-components/native";

interface WrapperProps {
  status: string;
}

export const StyledWrapper = styled.TouchableOpacity<WrapperProps>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  min-width: 100%;
  padding: 16px;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.borderColors.primary};

  border-left-width: 8px;
  border-left-color: ${({ theme, status }) =>
    status === "done"
      ? theme.colors.success[500]
      : status == "emergency"
      ? theme.colors.warning[500]
      : theme.colors.gray[300]};
`;
