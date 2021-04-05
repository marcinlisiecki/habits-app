import styled from 'styled-components/native';

interface WrapperProps {
  margin?: string;
}

export const StyledWrapper = styled.View<WrapperProps>`
  margin: ${({ margin = '0' }) => margin};
  width: 100%;
`;
