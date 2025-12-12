import { fetchNotes } from '@/lib/api';
import NotesClient from './NoteDetails.client';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params.slug ?? [];
  const tag = slug[0] === 'all' ? 'All' : slug[0];

  const title = `Notes — ${tag} — NoteHub`;
  const description = `Listing of ${tag} notes in NoteHub. Browse notes filtered by ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/notes/filter/${slug.join('/')}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

interface PropsFilter {
  params: { slug: string[] };  
}

export default async function Notes({ params }: PropsFilter) {
  const slug = params.slug ?? []; 
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes({ search: '', page: 1, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}


