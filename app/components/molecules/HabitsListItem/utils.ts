import moment from 'moment';

export const calculateStreak = (habit: Habit, date: Date) => {
  date.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = date;

  const getSubtractionValue = () => {
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
    return moment(date).subtract(getSubtractionValue(), 'day').toDate();
  };

  const findIndexOfHistory = (date: Date) => {
    return habit.doneHistory.indexOf(date.toDateString()) !== -1
      ? habit.doneHistory.indexOf(date.toDateString())
      : habit.backupHistory.indexOf(date.toDateString());
  };

  if (findIndexOfHistory(currentDate) === -1) currentDate = subtractDay(currentDate);

  while (
    findIndexOfHistory(currentDate) !== -1 ||
    findIndexOfHistory(subtractDay(currentDate)) !== -1
  ) {
    console.log(findIndexOfHistory(currentDate));

    if (findIndexOfHistory(currentDate) !== -1) {
      streak++;
    }

    currentDate = subtractDay(currentDate);
  }

  return streak;
};

// export const calculateStreak = (habit: Habit, date: Date) => {
//   date.setHours(0, 0, 0, 0);
//
//   let streak = 0;
//   let currentDate = date;
//
//   const getSubtractionValue = () => {
//     habit.repeat.sort((a, b) => a - b);
//
//     const dayOfWeek = currentDate.getDay();
//     const index = habit.repeat.indexOf(dayOfWeek);
//
//     if (habit.repeat.length == 1) return 7;
//     if (index > 0) {
//       return habit.repeat[index] - habit.repeat[index - 1];
//     } else {
//       return 7 - habit.repeat[habit.repeat.length - 1];
//     }
//   };
//
//   const subtractDay = (date: Date) => {
//     return moment(date).subtract(getSubtractionValue(), 'day').toDate();
//   };
//
//   const findIndexOfHistory = (date: Date) =>
//     habit.history.findIndex((item) => moment(item.date).isSame(date.toISOString(), 'day'));
//
//   if (
//     findIndexOfHistory(currentDate) === -1 ||
//     habit.history[findIndexOfHistory(currentDate)].status === 'undone'
//   ) {
//     currentDate = subtractDay(currentDate);
//   }
//
//   while (
//     (findIndexOfHistory(currentDate) !== -1 &&
//       habit.history[findIndexOfHistory(currentDate)].status !== 'undone') ||
//     (findIndexOfHistory(subtractDay(currentDate)) !== -1 &&
//       habit.history[findIndexOfHistory(subtractDay(currentDate))].status !== 'undone')
//   ) {
//     if (
//       findIndexOfHistory(currentDate) !== -1 &&
//       habit.history[findIndexOfHistory(currentDate)].status !== 'undone'
//     ) {
//       streak++;
//     }
//
//     currentDate = subtractDay(currentDate);
//   }
//
//   return streak;
// };
