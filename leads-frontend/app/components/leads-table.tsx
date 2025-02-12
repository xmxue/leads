'use client';

import { Table, Pagination } from '@mantine/core';
import { useState } from 'react';
import { Lead } from '../../api-client/types.gen';


const LeadsTable = ({ leads }: { leads: Lead[] }) => {
  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Company</Table.Th>
          <Table.Th>Stage</Table.Th>
          <Table.Th>Engaged</Table.Th>
          <Table.Th>Last Contacted</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {leads.map((lead) => (
          <Table.Tr key={lead.id}>
            <Table.Td>{lead.name}</Table.Td>
            <Table.Td>{lead.company}</Table.Td>
            <Table.Td>{lead.stage}</Table.Td>
            <Table.Td>{lead.engaged ? "Yes" : "No"}</Table.Td>
            <Table.Td>{lead.last_contacted}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
      <Table.Tfoot>
        <Table.Tr>
          <Table.Td colSpan={5}>
            <LeadsTableFooter total={leads.length}/>
          </Table.Td>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
}


const LeadsTableFooter = ({ total }: {total: number}) => {
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


export default LeadsTable;
