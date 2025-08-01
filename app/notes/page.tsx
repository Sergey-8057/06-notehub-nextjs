'use client';

import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import toast, { Toaster } from 'react-hot-toast';

import { fetchNotes } from '../../lib/api';
// import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
// import Loader from '../Loader/Loader.tsx';
import Modal from '../../components/Modal/Modal';
import NoteList from '../../components/NoteList/NoteList';
import NoteForm from '../../components/NoteForm/NoteForm';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';

import css from './page.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalNote, setIsModalNote] = useState(false);
  const perPage = 12;

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page, perPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data.notes.length === 0) {
      // toast.error('No notes found for your request.');
    }
  }, [isSuccess, data]);

  const totalPages = data?.totalPages ?? 0;

  const updateQuery = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, 1000);

  const openModal = () => setIsModalNote(true);
  const closeModal = () => setIsModalNote(false);

  return (
    <div className={css.app}>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={updateQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} changePage={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {/* {isLoading && <Loader />} */}
      {/* {isError && <ErrorMessage />} */}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalNote && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
