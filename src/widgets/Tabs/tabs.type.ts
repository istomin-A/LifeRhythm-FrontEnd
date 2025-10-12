interface ErrorType {
  field: string;
  message: string;
}

export interface tabTypes {
  error: ErrorType;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  tabOne: React.ReactElement;
  tabTwo: React.ReactElement;
  tabThree: React.ReactElement;
}