import { getDaysInMonth } from '@app/utils/date';

export const mutateMonthByHabitStatus = (habits: Habit[] | Habit, selectedDate: Date) => {
  return getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear()).map((day: any) => {
    let done = 0;
    let color: 'danger' | 'warning' | 'success' | 'none' = 'none';

    const isDone = (habit: Habit) => habit.doneHistory.includes(day.toDateString());
    const isBackup = (habit: Habit) => habit.backupHistory.includes(day.toDateString());

    if (!Array.isArray(habits)) {
      return {
        date: day,
        color: isDone(habits)
          ? 'success'
          : isBackup(habits)
          ? 'warning'
          : habits.repeat.includes(day.getDay())
          ? 'danger'
          : 'none',
      };
    }

    const filteredHabits = habits.filter((habit) => habit.repeat.includes(day.getDay()));
    done = filteredHabits.reduce(
      (sum, item: Habit) => (isDone(item) || isBackup(item) ? sum + 1 : sum),
      0
    );

    if (filteredHabits.length > 0) {
      if (done == filteredHabits.length) color = 'success';
      else if (done > 0) color = 'warning';
      else color = 'danger';
    }

    return {
      date: day,
      color,
    };
  });
};
