export type ModalProps = {
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};