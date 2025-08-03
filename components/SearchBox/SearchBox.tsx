'use client';

import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  initialValue: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ initialValue, onSearchChange }: SearchBoxProps) {
  const debounced = useDebouncedCallback((value: string) => {
    onSearchChange(value);
  }, 300);

  return (
    <input
      className={css.input}
      defaultValue={initialValue}
      onChange={e => debounced(e.target.value)}
      type="text"
      placeholder="Search notes"
    />
  );
}
