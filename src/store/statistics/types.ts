export interface StatisticsType {
  id: number;
  user_id: string;
  state_date: string;
  goals: number;
  done_goals: number;
  active_goals: number;
  overdue_goals: number;
  actions: StatisticsType[]
}

export interface ShareAchievements {
  message: string;
  link: string;
}