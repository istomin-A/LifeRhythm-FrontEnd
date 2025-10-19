export interface GoalItem {
  titleGoal: string;
  descriptoinGoal: string;
  status: string;
  endDateTask: string;
  dateDone: string
  createdAt?: string;
  fotmatedAt?: string;
}

export interface Goal {
  id?: number;
  user_id: string;
  goals: GoalItem[];
}