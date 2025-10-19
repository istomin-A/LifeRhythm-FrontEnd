export interface FormMainProps {
  labelUserName: string;
  labelPassword?: string;
  textArea?: boolean;
  oneInput?: boolean;
  error?: { field: string; message: string };
  setUsername?: (value: string) => void;
  setPassword?: (value: string) => void;
  setTitleGoal?: (value: string) => void;
  setEmail?: (value: string) => void;
  setDescriptoinGoal?: (value: string) => void;
  username?: string;
  password?: string;
  titleGoal?: string;
  email?: string;
  descriptoinGoal?: string;
  handleAddUser?: (e: React.FormEvent<HTMLFormElement>) => void;
  Goals?: (e: React.FormEvent<HTMLFormElement>) => void;
  sendEmail?: (e: React.FormEvent<HTMLFormElement>) => void;
}