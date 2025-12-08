'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/utilities/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';

export const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const router = useRouter();

  const searchParams = useSearchParams();

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set('q', debouncedValue);
    } else {
      params.delete('q');
    }

    const search = params.toString();
    const query = search ? `?${search}` : '';

    // Only push if the query string has actually changed
    if (searchParams.toString() !== params.toString()) {
      router.push(`/search${query}`);
    }
  }, [debouncedValue, router, searchParams]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== value) {
      setValue(q);
    }
  }, [searchParams]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  );
};
