export type ResultSearchResultType = {
  status: string,
  dateDone: string,
  createdAt: string,
  titleGoal: string,
  endDateTask: string,
  descriptoinGoal: string
}

export type ResultSearchType = {
  userId: string,
  query: string,
  results: ResultSearchResultType[]
}