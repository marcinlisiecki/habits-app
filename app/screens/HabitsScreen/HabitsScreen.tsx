import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';

import useUser from '@app/hooks/useUser';

import MainTemplate from '@app/templates/MainTemplate';
import HabitsHeader from '@app/components/organisms/HabitsHeader';
import HabitsList from '@app/components/organisms/HabitsList';

import DateTimePicker from 'react-native-modal-datetime-picker';
import { Text, View } from 'react-native';
import { scrollToIndex, getInitialDate, filterHabitsByRepeat } from './utils';
import { mutateMonthByHabitStatus } from '@app/utils/calendar';
import Typography from '@app/components/atoms/Typography';

const HabitsScreen: FunctionComponent = () => {
  const { user } = useUser();
  const listRef: any = useRef();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [days, setDays] = useState<HeaderDays[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate());
  const [habits, setHabits] = useState<Habit[]>(user?.habits || []);

  useEffect(() => {
    scrollToIndex(listRef, selectedDate);
  }, [listRef]);

  useEffect(() => {
    if (!user) return;
    setHabits(filterHabitsByRepeat(user.habits, selectedDate));
  }, [selectedDate, user]);

  useEffect(() => {
    if (!user) return;
    const newDays: any[] = mutateMonthByHabitStatus(user.habits, selectedDate);

    setDays(newDays);
  }, [user]);

  const openDatePicker = () => setShowDatePicker(true);

  const selectDay = useCallback((index: number): void => {
    const day = new Date(selectedDate);
    day.setDate(index + 1);

    setSelectedDate(day);
    scrollToIndex(listRef, day);
  }, []);

  const handlePickDate = useCallback((date: Date) => {
    date.setHours(0, 0, 0, 0);

    setSelectedDate(date);
    setShowDatePicker(false);
  }, []);

  if (!days) return <Typography>loading...</Typography>;

  return (
    <View style={{ flex: 1, flexGrow: 1 }}>
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
        {habits.length > 0 && <HabitsList habits={habits} selectedDate={selectedDate} />}
      </MainTemplate>
    </View>
  );
};

export default HabitsScreen;
