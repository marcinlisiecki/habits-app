import React, { FunctionComponent } from "react";
import Typography from "@app/components/atoms/Typography";
import moment from "moment";

import useUser from "@app/hooks/useUser";
import { changeHabitStatus } from "@app/mutations/habit";

import { StyledWrapper } from "./styles";
import { calculateStreak } from "./utils";

interface Props {
  habit: Habit;
  date: Date;
}

const HabitsListItem: FunctionComponent<Props> = ({ habit, date }) => {
  const { user, updateUser } = useUser();

  const { name, emergency } = habit;
  const streak = calculateStreak(habit, date);

  const status: string =
    habit?.history?.find((item) =>
      moment(item?.date).isSame(date.toISOString(), "day")
    )?.status || "undone";

  const handleClick = async () => {
    if (!user) return;
    await updateUser(changeHabitStatus({ user, habit, date }));
  };

  return (
    <StyledWrapper onPress={handleClick} status={status}>
      <Typography size={"h5"} weight={600} color={"primary"}>
        {name}
      </Typography>
      <Typography size={"p"} weight={500} color={"secondary"}>
        {emergency}
      </Typography>
      <Typography
        margin={"10px 0 0 0"}
        color={streak > 0 ? "special" : "secondary"}
        weight={500}
        letterSpacing={"1px"}
      >
        {streak} days streak
      </Typography>
    </StyledWrapper>
  );
};

export default HabitsListItem;
