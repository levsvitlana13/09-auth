'use client';

import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/clientApi';
import { useState } from 'react';
import Link from 'next/link';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <h1>NoteHub</h1>
        <Link href='/notes/action/create' className={css.button}>
          Create note +
        </Link>

        <SearchBox
          value={search}
          onSearch={value => {
            setSearch(value);
            setPage(1);
          }}
        />
      </header>

      {(isLoading || isFetching) && <p>Loading...</p>}

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default NotesClient;
