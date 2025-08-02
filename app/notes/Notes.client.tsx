'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

interface NotesClientProps {
  initialData: NotesResponse;
  initialSearchParams: {
    search: string;
    page: number;
  };
}

export default function NotesClient({ initialData, initialSearchParams }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? initialSearchParams.search;
  const page = Number(searchParams.get('page')) || initialSearchParams.page;
  const perPage = 12;

  const { data: response } = useQuery<NotesResponse>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page, perPage),
    initialData,
    placeholderData: previousData => previousData as NotesResponse,
  });

  const hasNotes = response?.notes?.length > 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox initialValue={search} />
        {response?.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={response.totalPages} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {hasNotes ? <NoteList notes={response.notes} /> : <p>No notes found</p>}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
