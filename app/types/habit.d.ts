interface Habit {
  _id: string;
  name: string;
  status?: string;
  repeat: number[];
  history: HabitHistory[];
}

interface HabitHistory {
  status: string;
  date: string;
}
