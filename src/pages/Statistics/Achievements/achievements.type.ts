import type { AchievementsType } from '@/store/achievements/types'

export interface AchievementsComponent {
  data: AchievementsType | null;
  account?: boolean;
}