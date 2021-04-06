import moment from "moment";

export const createNewHabit = (user: User, habit: Habit): User => ({
  ...user,
  habits: [...user.habits, habit],
});

interface ChangeHabitStateProps {
  user: User;
  date: Date;
  habit: Habit;
}

export const changeHabitStatus = ({
  user,
  date,
  habit,
}: ChangeHabitStateProps): User => {
  const index: number = habit.history.findIndex((item) =>
    moment(item.date).isSame(date.toISOString(), "day")
  );

  if (index === -1) {
    habit.history.push({ date: date.toISOString(), status: "done" });
  } else {
    const history = habit.history[index];

    if (history.status == "undone") history.status = "done";
    else if (history.status == "done") history.status = "emergency";
    else if (history.status == "emergency") history.status = "undone";
  }

  const habitIndex = user.habits.findIndex((item) => item._id == habit._id);
  if (habitIndex !== -1) user.habits[habitIndex].history = [...habit.history];

  return user;
};
