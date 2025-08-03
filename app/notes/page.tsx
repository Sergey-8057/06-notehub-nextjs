import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const search = '';
  const page = 1;
  const perPage = 12;
  const initialData = await fetchNotes(search, page, perPage);

  return <NotesClient initialData={initialData} initialSearchParams={{ search, page }} />;
}
