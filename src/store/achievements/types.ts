export interface Achievement {
  name: string;
  status: string;
  dateAchieved: string | null;
  description: string;
  achievementsId: number;
}

export interface AchievementsType {
  user_id: string;
  achievements: Achievement[];
}

export interface LinkDB {
  user_id: string;
  token: string;
  created_at: string;
}