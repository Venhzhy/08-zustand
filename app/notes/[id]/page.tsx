import { fetchNoteById } from '@/lib/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

// Дефолтний компонент сторінки
const NotePage = async ({ params }: PageProps) => {
  const note = await fetchNoteById(params.id);

  // Якщо нотатку не знайдено, перенаправляємо на 404
  if (!note) {
    notFound();
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
};

export default NotePage;

