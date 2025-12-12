import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Draft = {
  title: string;
  content: string;
  tag: string;
};

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: Draft;
  setDraft: (patch: Partial<Draft>) => void;
  replaceDraft: (d: Draft) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: (patch: Partial<Draft>) =>
        set(state => ({ draft: { ...state.draft, ...patch } })),
      replaceDraft: d => set(() => ({ draft: d })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'notehub-note-store', 
      partialize: state => ({ draft: state.draft }),
    }
  )
);