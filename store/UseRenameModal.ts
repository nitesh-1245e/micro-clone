import { create } from 'zustand';

const defaultValues = { id: "", title: "" };

interface UseRenameModalProps {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<UseRenameModalProps>((set) => ({
  isOpen: false,
   // Provide default values for id and title
  onOpen: (id: string, title: string) => set({
    isOpen: true,
    initialValues: { id, title }, // Use destructuring to set id and title
  }),
  onClose: () => set({
    isOpen: false,
    initialValues:defaultValues, // Reset to default values
  }),
  initialValues:defaultValues,
}));
