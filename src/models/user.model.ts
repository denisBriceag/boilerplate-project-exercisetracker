import { Exercise } from "./exercise.model";

export interface User {
  id: number;
  username: string;
}

interface UserExerciseLog extends User {
  logs: Exercise[];
  count: number;
}
