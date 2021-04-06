import React, { FunctionComponent } from "react";
import Typography from "@app/components/atoms/Typography";

import useUser from "@app/hooks/useUser";
import { changeHabitStatus } from "@app/mutations/habit";

import { StyledWrapper } from "./styles";

interface Props {
  habit: Habit;
  date: Date;
}

const HabitsListItem: FunctionComponent<Props> = ({ habit, date }) => {
  const { user, updateUser } = useUser();

  const { name } = habit;
  const streak = 1;

  const status: string =
    habit?.history?.find((item) => item?.date == date.toISOString())?.status ||
    "undone";

  const handleClick = async () => {
    if (!user) return;
    await updateUser(changeHabitStatus({ user, habit, date }));
  };

  return (
    <StyledWrapper onPress={handleClick} status={status}>
      <Typography size={"h5"} weight={600}>
        {name}
      </Typography>
      <Typography
        color={streak > 0 ? "special" : "secondary"}
        weight={500}
        letterSpacing={"1px"}
      >
        {status}
        {/*{streak} days streak, {status}*/}
      </Typography>
    </StyledWrapper>
  );
};

export default HabitsListItem;
