import styled from "styled-components/native";

interface WrapperProps {
  centered?: boolean;
}

export const StyledWrapper = styled.View<WrapperProps>`
  margin: ${({ centered = false }) => (centered ? "20px auto" : "20px 0")};
`;
