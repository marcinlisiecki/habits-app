import { enumerateDaysBetweenDates } from '@app/utils/calendar';
import { calculateStreak } from '@app/utils/habits';
import moment from 'moment';
import 'moment-weekday-calc';

export const sortHistory = (history: string[]): string[] =>
  history.sort((a: any, b: any) => new Date(a).getTime() - new Date(b).getTime());

export const getFirstHabitHistoryDay = (habit: Habit) =>
  Math.min(
    new Date(sortHistory(habit.doneHistory)[0]).getTime() || Infinity,
    new Date(sortHistory(habit.backupHistory)[0]).getTime() || Infinity
  );

export const getLastHabitHistoryDay = (habit: Habit) =>
  Math.max(
    new Date(sortHistory(habit.doneHistory).reverse()[0]).getTime() || -Infinity,
    new Date(sortHistory(habit.backupHistory).reverse()[0]).getTime() || -Infinity
  );

export const calculateBestStreak = (habit: Habit) =>
  Math.max(
    ...enumerateDaysBetweenDates(
      new Date(getFirstHabitHistoryDay(habit)),
      new Date(getLastHabitHistoryDay(habit))
    ).map((day) => {
      return calculateStreak(habit, new Date(day));
    }),
    0
  );

export const getTotalDays = (habit: Habit) =>
  moment().weekdayCalc({
    rangeStart: getFirstHabitHistoryDay(habit),
    rangeEnd: new Date(new Date().toDateString()).getTime(),
    weekdays: habit.repeat,
  });

export const getPieChartData = (
  totalMainGoalDone: any,
  totalBackupGoalDone: any,
  totalUndone: any
) => [
  {
    name: 'Main goal',
    color: 'rgba(64,214,141,0.9)',
    count: totalMainGoalDone || 0,
    legendFontColor: '#fff',
  },
  {
    name: 'Backup goal',
    color: 'rgba(234,179,8,0.9)',
    count: totalBackupGoalDone || 0,
    legendFontColor: '#fff',
  },
  {
    name: 'Undone',
    color: 'rgba(230,76,76,0.9)',
    count: totalUndone || 0,
    legendFontColor: '#fff',
  },
];
