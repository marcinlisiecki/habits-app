interface Habit {
  _id: string;
  name: string;
  emergency: string;
  status?: string;
  repeat: number[];
  history: HabitHistory[];
}

interface HabitHistory {
  status: string;
  date: string;
}
