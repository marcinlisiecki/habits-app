import React, { FunctionComponent } from 'react';

import Input from '@app/components/atoms/Input';
import Label from '@app/components/atoms/Label';

import { StyledWrapper } from './styles';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  margin?: string;
  onChange?: (text: string) => void;
  [key: string]: any;
}

const FormField: FunctionComponent<Props> = ({ label = '', margin = '0', ...props }) => {
  return (
    <StyledWrapper margin={margin}>
      <Label margin={'0px 0px 4px 0px'}>{label}</Label>
      <Input {...props} />
    </StyledWrapper>
  );
};

export default FormField;
