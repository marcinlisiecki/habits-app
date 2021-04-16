import styled from "styled-components/native";

interface WrapperProps {
  marginTop?: string;
}

export const StyledWrapper = styled.View<WrapperProps>`
  margin-top: ${({ marginTop = "0" }) => marginTop};
  width: 100%;
`;
