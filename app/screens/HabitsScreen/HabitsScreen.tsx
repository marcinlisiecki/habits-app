import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { getDaysInMonth } from "@app/utils/date";
import useUser from "@app/hooks/useUser";

import MainTemplate from "@app/templates/MainTemplate";
import Typography from "@app/components/atoms/Typography";
import HabitsHeader from "@app/components/organisms/HabitsHeader";
import HabitsList from "@app/components/organisms/HabitsList";
import { View } from "react-native";
import DateTimePicker, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";
import { StyledContent } from "@app/components/organisms/HabitsHeader/styles";

const HabitsScreen: FunctionComponent = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { user } = useUser();
  const listRef: any = useRef();

  const getInitialDate = (): Date => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setUTCDate(today.getUTCDate());
    return today;
  };

  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate());
  const days = getDaysInMonth(
    selectedDate.getUTCMonth(),
    selectedDate.getUTCFullYear()
  );

  const [habits, setHabits] = useState<Habit[]>(user?.habits || []);

  const selectDay = (index: number): void => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setUTCDate(index + 1);

    setSelectedDate(today);
  };

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollToIndex({
        index: Math.max(0, selectedDate.getUTCDate() - 1),
        animated: true,
        viewPosition: 0.5,
      });
  }, [selectedDate]);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      selectedDate.getUTCDate()
    ).getDay();

    setHabits([
      ...(user?.habits.filter((habit: Habit) =>
        habit.repeat.includes(dayOfWeek)
      ) || []),
    ]);
  }, [user]);

  const openDatePicker = () => setShowDatePicker(true);

  const handlePickDate = (date: Date) => {
    date.setUTCHours(0, 0, 0, 0);
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <>
      <HabitsHeader
        days={days}
        selectDay={selectDay}
        selectedDate={selectedDate}
        ref={listRef}
        openDatePicker={openDatePicker}
      />
      <DateTimePicker
        isVisible={showDatePicker}
        onCancel={() => setShowDatePicker(false)}
        onConfirm={handlePickDate}
        isDarkModeEnabled={false}
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
