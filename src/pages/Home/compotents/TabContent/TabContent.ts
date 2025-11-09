import type { GoalItem } from "@/store/goals/types";
import type { TokenProps } from "@/pages/Home/home.type";
import type { User } from '@/store/users/types'

export interface TabContentProps {
  infoToken?: TokenProps["infoToken"];
  errorGetGoals?: string | null;
  errorUpdateGoals?: string | null;
  activeGoals?: GoalItem[];
  doneGoals?: GoalItem[];
  goals?: TabContentProps['activeGoals'];
  user?: User | null

  updateGoalUI?: (userId: string, createdAt: string, status: string, dateDone: string, e?: React.MouseEvent<HTMLButtonElement>) => void;
  removeGoal?: (e: React.MouseEvent<HTMLButtonElement>, userId: string, createdAt: string) => void;
  onSelectDate?: (createdAt: string, endDateTask: string) => void;
  sendEmail?: (
    userId: string,
    createDateGoal: string,
    email: string,
    titleEmail: string,
    bodyEmail: string
  ) => Promise<void>
}
