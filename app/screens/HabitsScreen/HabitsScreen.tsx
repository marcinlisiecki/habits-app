import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { getDaysInMonth } from "@app/utils/date";
import useUser from "@app/hooks/useUser";

import MainTemplate from "@app/templates/MainTemplate";
import Typography from "@app/components/atoms/Typography";
import HabitsHeader from "@app/components/organisms/HabitsHeader";
import HabitsList from "@app/components/organisms/HabitsList";

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { Text } from "react-native";
import {
  mutateHeaderDays,
  scrollToIndex,
  getInitialDate,
  filterHabitsByRepeat,
} from "./utils";

const HabitsScreen: FunctionComponent = () => {
  const { user } = useUser();
  const listRef: any = useRef();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [days, setDays] = useState<HeaderDays[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate());
  const [habits, setHabits] = useState<Habit[]>(user?.habits || []);

  const selectDay = (index: number): void => {
    const day = new Date(selectedDate);
    day.setDate(index + 1);

    setSelectedDate(day);
  };

  useEffect(() => {
    scrollToIndex(listRef, selectedDate);
  }, [selectedDate, listRef]);

  useEffect(() => {
    if (!user) return;
    setHabits(filterHabitsByRepeat(user.habits, selectedDate));
  }, [selectedDate, user]);

  useEffect(() => {
    if (!user) return;
    const newDays: HeaderDays[] = mutateHeaderDays(user.habits, selectedDate);
    setDays(newDays);
  }, [user]);

  const openDatePicker = () => setShowDatePicker(true);

  const handlePickDate = (date: Date) => {
    date.setHours(0, 0, 0, 0);

    setSelectedDate(date);
    setShowDatePicker(false);
  };

  if (!days) return <Text>loading...</Text>;

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
        timeZoneOffsetInMinutes={-new Date().getTimezoneOffset()}
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
