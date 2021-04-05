import React, { FunctionComponent } from "react";

interface Props {
  habits: Habit[];
  selectedDate: Date;
}

import { StyledWrapper } from "./styles";
import HabitsListItem from "@app/components/molecules/HabitsListItem";

const HabitsList: FunctionComponent<Props> = ({ habits, selectedDate }) => {
  return (
    <StyledWrapper>
      {habits.map((habit, index) => (
        <HabitsListItem habit={habit} key={index} date={selectedDate} />
      ))}
    </StyledWrapper>
  );
};

export default HabitsList;
