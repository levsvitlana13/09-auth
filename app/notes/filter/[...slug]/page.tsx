import type { Metadata } from 'next';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug[0];

  const filterTitle =
    filter === 'all'
      ? 'All notes'
      : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} notes`;

  return {
    title: `${filterTitle} | NoteHub`,
    description: `Browse ${filterTitle.toLowerCase()} in NoteHub.`,
    openGraph: {
      title: `${filterTitle} | NoteHub`,
      description: `Browse ${filterTitle.toLowerCase()} in NoteHub.`,
      url: `https://notehub.com/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: '',
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
