import type { ResultSearchResultType } from '@/store/search/query/type'

export interface ResultSearchModalTypes {
  data: ResultSearchResultType[] | undefined;
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}