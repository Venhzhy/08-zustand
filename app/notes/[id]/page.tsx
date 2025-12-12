import { fetchNoteById } from '@/lib/api';
import { Metadata } from 'next';
import NoteClient from './Note.client'; // Якщо в тебе є клієнтський компонент
// Якщо немає — скажи, я напишу

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);
    const title = `${note.title} — NoteHub`;
    const description = `${note.content.slice(0, 120)}${note.content.length > 120 ? '...' : ''}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://my-domain.com/notes/${params.id}`,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  } catch (_) {
    return {
      title: 'Note — NoteHub',
      description: 'Note details.',
      openGraph: {
        title: 'Note — NoteHub',
        description: 'Note details.',
        url: `https://my-domain.com/notes/${params.id}`,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  }
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await fetchNoteById(params.id);

  return <NoteClient note={note} />;
}

