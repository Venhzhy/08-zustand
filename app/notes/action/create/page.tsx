import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'; // скопіюй CreateNote.module.css у /app або components відповідно
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note — NoteHub',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'Create note — NoteHub',
    description: 'Create a new note in NoteHub',
    url: 'https://your-domain.com/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}