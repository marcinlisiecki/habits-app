interface Habit {
  _id: string;
  name: string;
  backup?: string | null;
  status?: string;
  repeat: number[];
  history: HabitHistory[];
}

interface HabitHistory {
  status: string;
  date: string;
}
