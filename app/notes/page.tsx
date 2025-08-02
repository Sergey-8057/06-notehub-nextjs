import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client';

interface NotesPageProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolvedParams = await Promise.resolve(searchParams);

  const search = resolvedParams.search || '';
  const page = Number(resolvedParams.page) || 1;
  const perPage = 12;

  const initialData = await fetchNotes(search, page, perPage);

  return <NotesClient initialData={initialData} initialSearchParams={{ search, page }} />;
}
