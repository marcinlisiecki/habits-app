import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

interface Props {
  children?: string;
  margin?: string;
}

const StyledLabel = styled.Text<Props>`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.p.fontSize};
  margin: ${({ margin = "0" }) => margin};
  font-family: ${({ theme }) => theme.typography.fontFamily.Montserrat[500]};
`;

const Label: FunctionComponent<Props> = ({ ...props }) => <StyledLabel {...props} />;
export default Label;
