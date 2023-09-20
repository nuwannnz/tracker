export interface Task {
  id?: string;
  title: string;
  isCompleted: boolean;
  timestamp: number;
  onGoingTimerSeconds: number;
  timeLogs: {
    date: number;
    seconds: number;
  }[];
}
