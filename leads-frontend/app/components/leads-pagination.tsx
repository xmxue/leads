'use client';

import { useState } from 'react';
import { Pagination } from '@mantine/core';


export default function LeadsPagination({ total }: {total: number}) {
  const [activePage, setPage] = useState(1);

  const pageSize = 10;
  
  return (
    <Pagination
      total={total/pageSize}
      size="xs"
      value={activePage}
      onChange={setPage}
    />
  );
  
}