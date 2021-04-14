import { getDaysInMonth } from "@app/utils/date";
import moment from "moment";
import { RefObject } from "react";

export const mutateHeaderDays = (habits: Habit[], selectedDate: Date) => {
  return getDaysInMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  ).map((day: any) => {
    let count = 0;
    let done = 0;

    habits.forEach((habit) => {
      const dayOfWeek = day.getDay();
      if (habit.repeat.includes(dayOfWeek)) {
        count++;
        const isDone: boolean =
          ["done", "emergency"].includes(
            habit?.history?.find((item) =>
              moment(item?.date).isSame(day.toISOString(), "day")
            )?.status || ""
          ) || false;

        if (isDone) done++;
      }
    });

    let color: "danger" | "warning" | "success" | "none" = "none";
    if (count > 0) {
      if (done === 0) color = "danger";
      else if (done === count) color = "success";
      else color = "warning";
    }

    return {
      date: day,
      color,
    };
  });
};

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

  return (
    habits.filter((habit: Habit) => habit.repeat.includes(dayOfWeek)) || []
  );
};
