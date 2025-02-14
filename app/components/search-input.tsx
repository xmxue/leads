'use client';

import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from "next/navigation";


export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', event.currentTarget.value);
    router.replace(`?${params.toString()}`);
  }

  return (
    <Input
      onChange={handleSearch}
      leftSection={<IconSearch size={16} />} 
      placeholder="Search by lead's name, email, or company name"
      aria-label="Search"
      flex={1}
    />
  );
}