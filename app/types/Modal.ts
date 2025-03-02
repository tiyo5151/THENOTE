export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}
