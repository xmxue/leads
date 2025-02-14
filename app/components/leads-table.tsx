'use client';

import { Table, Avatar, Group, Stack, Text, Badge} from '@mantine/core';
import { IconClockHour4, IconCircleCheck } from '@tabler/icons-react';
import StageIndicator from './stage-indicator';
import { LeadInfo } from '../../api-client/types.gen';
import EditLeadButton from './edit-lead-button';


export default function LeadsTable ({ leads, total_count }: { leads: LeadInfo[], total_count: number }) {
  return (
    <Stack gap="xs">
      <Text c="dimmed" size="xs">
        Showing 1-10 of {total_count} leads
      </Text>
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Company</Table.Th>
            <Table.Th>Stage</Table.Th>
            <Table.Th>Engaged</Table.Th>
            <Table.Th>Last Contacted</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {leads.map((lead) => (
            <Table.Tr key={lead.id}>
              <Table.Td>
                <Group>
                  <Avatar radius="xl" key={lead.name} name={lead.name} color="initials" />
                  <Stack gap={0}>
                    <Text>{lead.name}</Text>
                    <Text size='xs' c='dimmed'>{lead.email}</Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td>{lead.company}</Table.Td>
              <Table.Td>
                <StageIndicator stage={lead.stage} />
              </Table.Td>
              <Table.Td>
                {
                  lead.engaged  
                  ? <Badge radius="sm" leftSection={<IconCircleCheck size={12} />}>Engaged</Badge>
                  : <Badge radius="sm" leftSection={<IconClockHour4 size={12} />}  color="gray" >Not Engaged</Badge>
                }
              </Table.Td>
              <Table.Td>{lead.last_contacted}</Table.Td>
              <Table.Td>
              <EditLeadButton 
                leadId={lead.id} 
                stage={lead.stage} 
                engaged={lead.engaged} 
                last_contacted={new Date(lead.last_contacted)}
              />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}


