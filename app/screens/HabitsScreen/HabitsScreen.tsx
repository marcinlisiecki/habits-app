import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { getDaysInMonth } from "@app/utils/date";
import useUser from "@app/hooks/useUser";

import MainTemplate from "@app/templates/MainTemplate";
import Typography from "@app/components/atoms/Typography";
import HabitsHeader from "@app/components/organisms/HabitsHeader";
import HabitsList from "@app/components/organisms/HabitsList";

const HabitsScreen: FunctionComponent = () => {
  const { user } = useUser();
  const listRef: any = useRef();

  const date = new Date();
  const days = getDaysInMonth(date.getUTCMonth(), date.getUTCFullYear());

  const getInitialIndex = (): number =>
    days.findIndex((item) => item.getDate() == new Date().getDate());

  const getInitialDate = (): Date => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setUTCDate(today.getUTCDate());
    return today;
  };

  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate());
  const [selectedDay, setSelectedDay] = useState<number>(getInitialIndex());
  const [habits, setHabits] = useState<Habit[]>(user?.habits || []);

  const selectDay = (index: number): void => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setUTCDate(index + 1);

    setSelectedDate(today);
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

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      selectedDay + 1
    ).getDay();

    setHabits([
      ...(user?.habits.filter((habit: Habit) =>
        habit.repeat.includes(dayOfWeek)
      ) || []),
    ]);
  }, [user]);

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

        {habits.length > 0 && (
          <HabitsList habits={habits} selectedDate={selectedDate} />
        )}
      </MainTemplate>
    </>
  );
};

export default HabitsScreen;
