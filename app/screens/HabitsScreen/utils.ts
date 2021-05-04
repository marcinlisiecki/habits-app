import { RefObject } from 'react';

export const scrollToIndex = (ref: RefObject<any>, selectedDate: Date) => {
  if (!ref?.current) return;

  ref.current.scrollToIndex({
    index: Math.max(0, selectedDate.getDate() - 1),
    animated: true,
    viewPosition: 0.5,
  });
};

export const getInitialDate = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
};

export const filterHabitsByRepeat = (habits: Habit[], selectedDate: Date) => {
  const dayOfWeek = selectedDate.getDay();

  return habits.filter((habit: Habit) => habit.repeat.includes(dayOfWeek)) || [];
};
