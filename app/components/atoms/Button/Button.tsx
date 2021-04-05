import React, { FunctionComponent } from 'react';

import { StyledButton, StyledText } from './styles';

interface Props {
  onPress?: () => void;
}

const Button: FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  );
};

export default Button;
