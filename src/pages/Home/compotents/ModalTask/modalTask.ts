import type { GoalItem } from '@/store/goals/types';

export interface ModalTaskType {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGoal?: GoalItem;
  onSelectDate?: (createdAt: string, endDateTask: string) => void;
}