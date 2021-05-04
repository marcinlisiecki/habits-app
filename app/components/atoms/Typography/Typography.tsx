import styled from 'styled-components/native';

interface Props {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'p2' | 'p3';
  weight?: 300 | 400 | 500 | 600 | 700 | 800 | 900;
  color?: 'primary' | 'secondary' | 'error' | 'special' | 'warning' | 'success' | 'tertiary' | 'black';
  margin?: string;
  letterSpacing?: string;
  isCentered?: boolean;
}

const Typography = styled.Text<Props>`
  color: ${({ theme, color = 'primary' }) => theme.colors.text[color]};
  font-family: ${({ theme, weight = 500 }) => theme.typography.fontFamily.Montserrat[weight]};
  font-size: ${({ theme, size = 'p' }) => theme.typography[size].fontSize};
  letter-spacing: ${({ letterSpacing = '0' }) => letterSpacing};
  margin: ${({ margin = '0' }) => margin};
  text-align: ${({ isCentered = false }) => (isCentered ? 'center' : 'left')};
`;

export default Typography;
