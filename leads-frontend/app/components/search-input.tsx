'use client';

import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function SearchInput() {
  return (
    <Input
      leftSection={<IconSearch size={16} />} 
      placeholder="Search by lead's name, email, or company name"
      aria-label="Search"
      flex={1}
    />
  );
}