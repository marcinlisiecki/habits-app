import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import MainTemplate from "@app/templates/MainTemplate";
import Typography from "@app/components/atoms/Typography";

import { getDaysInMonth } from "@app/utils/date";
import HabitsHeader from "@app/components/organisms/HabitsHeader";
import HabitsList from "@app/components/organisms/HabitsList";
import useUser from "@app/hooks/useUser";

const HabitsScreen: FunctionComponent = () => {
  const { user } = useUser();
  const listRef: any = useRef();

  const date = new Date();
  const days = getDaysInMonth(date.getUTCMonth(), date.getUTCFullYear());

  const getInitialIndex = (): number =>
    days.findIndex((item) => item.getDate() == new Date().getDate());

  const [selectedDay, setSelectedDay] = useState<number>(getInitialIndex());
  const selectDay = (index: number): void => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setUTCDate(index + 1);

    setSelectedDay(index);
  };

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollToIndex({
        index: Math.max(0, selectedDay),
        animated: true,
        viewPosition: 0.5,
      });
  }, [selectedDay]);

  let habits: Habit[] = [];

  // Filters the habits by repeat and adds status to every habit
  user?.habits.map((habit: Habit) => {
    const today = new Date();
    const dayOfWeek = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      selectedDay + 1
    ).getDay();
    if (!habit.repeat.includes(dayOfWeek)) return;

    let _habit: any = {
      _id: habit._id,
      name: habit.name,
      status: "undone",
    };

    habit.history.map((history) => {
      const day: number = new Date(history.date).getUTCDate();
      const month: number = new Date(history.date).getUTCMonth();
      const year: number = new Date(history.date).getUTCFullYear();

      if (month !== new Date().getUTCMonth()) return;
      if (year !== new Date().getUTCFullYear()) return;

      if (day == selectedDay + 1) {
        _habit.status = history.status;
        _habit.history = history;
      }
    });

    habits.push(_habit);
  });

  return (
    <>
      <HabitsHeader
        days={days}
        selectDay={selectDay}
        selectedDay={selectedDay}
        ref={listRef}
      />
      <MainTemplate>
        <Typography size={"h4"} weight={600} margin={"40px 0 0 0"}>
          Your Progress
        </Typography>

        {habits.length > 0 && <HabitsList habits={habits} />}
      </MainTemplate>
    </>
  );
};

export default HabitsScreen;
