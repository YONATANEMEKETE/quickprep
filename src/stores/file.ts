import { create } from 'zustand';

interface Props {
  file: File | null;
  changeFile: (newFile: File) => void;
}

const useFile = create<Props>()((set) => ({
  file: null,
  changeFile: (newFile) => set(() => ({ file: newFile })),
}));

export default useFile;
