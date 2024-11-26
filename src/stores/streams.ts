import { create } from 'zustand';

interface Props {
  note: any;
  questions: any;
  changeNote: (newNote: any) => void;
  changeQuestions: (newQuestions: any) => void;
}

const useStream = create<Props>()((set) => ({
  note: null,
  questions: null,
  changeNote: (newNote) => set(() => ({ note: newNote })),
  changeQuestions: (newQuestions) => set(() => ({ questions: newQuestions })),
}));

export default useStream;
