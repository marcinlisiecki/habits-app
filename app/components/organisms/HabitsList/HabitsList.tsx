import React, { FunctionComponent } from "react";

interface Props {
  habits: Habit[];
}

import { StyledWrapper } from "./styles";
import HabitsListItem from "@app/components/molecules/HabitsListItem";

const HabitsList: FunctionComponent<Props> = ({ habits }) => {
  return (
    <StyledWrapper>
      {habits.map((habit, index) => (
        <HabitsListItem habit={habit} key={index} />
      ))}
    </StyledWrapper>
  );
};

export default HabitsList;
