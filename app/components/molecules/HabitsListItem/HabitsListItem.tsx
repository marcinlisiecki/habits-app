import React, { FunctionComponent } from "react";
import Typography from "@app/components/atoms/Typography";
import moment from "moment";

import useUser from "@app/hooks/useUser";
import { changeHabitStatus } from "@app/mutations/habit";

import { StyledWrapper } from "./styles";

interface Props {
  habit: Habit;
  date: Date;
}

const calculateStreak = (habit: Habit, date: Date) => {
  date.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = date;

  const getSubtractValue = () => {
    habit.repeat.sort((a, b) => a - b);

    const dayOfWeek = currentDate.getDay();
    const index = habit.repeat.indexOf(dayOfWeek);

    if (habit.repeat.length == 1) return 7;
    if (index > 0) {
      return habit.repeat[index] - habit.repeat[index - 1];
    } else {
      return 7 - habit.repeat[habit.repeat.length - 1];
    }
  };

  const subtractDay = (date: Date) => {
    return moment(date).subtract(getSubtractValue(), "day").toDate();
  };

  const findIndexOfHistory = (date: Date) =>
    habit.history.findIndex((item) =>
      moment(item.date).isSame(date.toISOString(), "day")
    );

  if (
    findIndexOfHistory(currentDate) === -1 ||
    habit.history[findIndexOfHistory(currentDate)].status === "undone"
  ) {
    currentDate = subtractDay(currentDate);
  }

  while (
    findIndexOfHistory(currentDate) !== -1 &&
    habit.history[findIndexOfHistory(currentDate)].status !== "undone"
  ) {
    currentDate = subtractDay(currentDate);

    streak++;
  }

  return streak;
};

const HabitsListItem: FunctionComponent<Props> = ({ habit, date }) => {
  const { user, updateUser } = useUser();

  const { name } = habit;
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
      <Typography size={"h5"} weight={600}>
        {name}
      </Typography>
      <Typography
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
