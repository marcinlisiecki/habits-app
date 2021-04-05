import React, { FunctionComponent } from "react";

interface Props {
  centered?: boolean;
}

import { StyledWrapper } from "./styles";
import Typography from "@app/components/atoms/Typography";

const Logo: FunctionComponent<Props> = ({ centered = false }) => {
  return (
    <StyledWrapper centered={centered}>
      <Typography color={"special"} letterSpacing={"10px"} weight={700}>
        HABITS
      </Typography>
    </StyledWrapper>
  );
};

export default Logo;
