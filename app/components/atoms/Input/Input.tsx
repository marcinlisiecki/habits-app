import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";

interface Props {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  type?: string;
  margin?: string;
  [key: string]: any;
}

const StyledInput = styled.TextInput<Props>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.Montserrat[500]};
  border-radius: 10px;
  padding: ${Platform.OS === "ios" ? "12px 10px" : "6px 10px"};
  width: 100%;
  margin: ${({ margin = "0" }) => margin};
`;

const Input: FunctionComponent<Props> = ({ type, onChange, ...props }) => (
  <StyledInput textContentType={type} onChangeText={onChange} {...props} />
);
export default Input;
