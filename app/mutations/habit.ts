import moment from 'moment';

export const createNewHabit = (user: User, habit: Habit): User => ({
  ...user,
  habits: [...user.habits, habit],
});

export const updateHabit = (user: User, habit: Habit): User => {
  const newUser = { ...user };
  const index = newUser.habits.findIndex((item) => item._id == habit._id);
  newUser.habits[index].repeat = habit.repeat;

  newUser.habits[index].name = habit.name;
  newUser.habits[index].name = habit.name;
  newUser.habits[index].backup = habit.backup;

  return newUser;
};

interface ChangeHabitStateProps {
  user: User;
  date: Date;
  habit: Habit;
}

// export const changeHabitStatus = ({
//   user,
//   date,
//   habit,
// }: ChangeHabitStateProps): User => {
//   const index: number = habit.history.findIndex((item) =>
//     moment(item.date).isSame(date.toISOString(), "day")
//   );
//
//   if (index === -1) {
//     habit.history.push({ date: date.toISOString(), status: "done" });
//   } else {
//     const history = habit.history[index];
//
//     if (history.status == "undone") history.status = "done";
//     else if (history.status == "done") {
//       if (habit.backup) history.status = "backup";
//       else history.status = "undone";
//     } else if (history.status == "backup") history.status = "undone";
//   }
//
//   const habitIndex = user.habits.findIndex((item) => item._id == habit._id);
//   if (habitIndex !== -1) user.habits[habitIndex].history = [...habit.history];
//
//   return user;
// };

export const changeHabitStatus = ({ user, date, habit }: ChangeHabitStateProps) => {
  const status = habit.doneHistory.includes(date.toDateString())
    ? 'done'
    : habit.backupHistory.includes(date.toDateString())
    ? 'backup'
    : 'undone';

  if (status == 'done') {
    habit.doneHistory = habit.doneHistory.filter((item) => item !== date.toDateString());
    if (habit.backup) habit.backupHistory.push(date.toDateString());
  } else if (status == 'backup') {
    habit.backupHistory = habit.backupHistory.filter((item) => item !== date.toDateString());
  } else {
    habit.doneHistory.push(date.toDateString());
  }

  const habitIndex = user.habits.findIndex((item) => item._id == habit._id);
  if (habitIndex !== -1) user.habits[habitIndex] = habit;

  return user;
};

export const deleteHabit = (user: User, id: string) => {
  const newUser: User = { ...user };

  newUser.habits = newUser.habits.filter((habit: Habit) => habit._id !== id);
  return newUser;
};
