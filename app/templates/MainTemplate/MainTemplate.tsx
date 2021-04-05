import React, { FunctionComponent } from "react";

import { StyledWrapper, StyledContent } from "./styles";

const MainTemplate: FunctionComponent = ({ children }) => {
  return (
    <StyledWrapper>
      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  );
};

export default MainTemplate;
