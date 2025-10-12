import type { GoalItem } from "@/store/goals/types";
import type { HomeProps } from "../home.type";

export interface TabContentProps {
  infoToken?: HomeProps["infoToken"];
  errorGetGoals?: string | null;
  errorUpdateGoals?: string | null;
  activeGoals?: GoalItem[];
  doneGoals?: GoalItem[];
  goals?: TabContentProps['activeGoals'];
  updateGoalStatus?: (userId: string, createdAt: string, status: string) => void;
  removeGoal?: (userId: string, createdAt: string) => void;
}
