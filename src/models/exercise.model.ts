export type CreatedExerciseResponse = {
  userId: number;
  exerciseId: number;
  duration: number;
  date: Date;
  description: string;
};

export type Exercise = {
  id: number;
  description: string;
  duration: number;
  date: Date;
};
