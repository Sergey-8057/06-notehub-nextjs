'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  initialValue: string;
}

export default function SearchBox({ initialValue }: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    router.push(`/notes?${params.toString()}`);
  }, 300);

  return (
    <input
      className={css.input}
      defaultValue={initialValue}
      onChange={e => handleSearch(e.target.value)}
      type="text"
      placeholder="Search notes"
    />
  );
}
