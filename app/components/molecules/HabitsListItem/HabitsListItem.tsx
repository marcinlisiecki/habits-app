import React, { FunctionComponent } from "react";
import Typography from "@app/components/atoms/Typography";

interface Props {
  habit: Habit;
}

import { StyledWrapper } from "./styles";

const HabitsListItem: FunctionComponent<Props> = ({ habit }) => {
  const { name, status } = habit;
  const streak = 1;

  return (
    <StyledWrapper>
      <Typography size={"h5"} weight={600}>
        {name}
      </Typography>
      <Typography
        color={streak > 0 ? "special" : "secondary"}
        weight={500}
        letterSpacing={"1px"}
      >
        {streak} days streak, {status}
      </Typography>
    </StyledWrapper>
  );
};

export default HabitsListItem;
