import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Props {
  file: File | null;
  changeFile: (newFile: File) => void;
}

const useFile = create(
  persist<Props>(
    (set, get) => ({
      file: null,
      changeFile: (newFile: File) => set(() => ({ file: newFile })),
    }),
    {
      name: 'file-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useFile;
