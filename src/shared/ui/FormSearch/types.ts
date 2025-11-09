import type { ResultSearchResultType } from '@/store/search/query/type'

export interface FormSearchTypes {
  search: (e: React.FormEvent<HTMLFormElement>, searchWord: string) => void;
  isErrorSearch: ResultSearchResultType[] | undefined;
}