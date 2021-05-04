interface Habit {
  _id: string;
  name: string;
  backup?: string | null;
  repeat: number[];

  doneHistory: string[];
  backupHistory: string[];
}
