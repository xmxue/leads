'use client';

import { useState } from 'react';
import { Pagination } from '@mantine/core';
import { useRouter, useSearchParams } from "next/navigation";


export default function LeadsPagination({ total }: {total: number}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activePage, setPage] = useState(1);

  const pageSize = 10;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.replace(`?${params.toString()}`);
    setPage(page);
  }

  return (
    <Pagination
      total={total/pageSize + 1}
      size="xs"
      value={activePage}
      onChange={handlePageChange}
    />
  );
  
}