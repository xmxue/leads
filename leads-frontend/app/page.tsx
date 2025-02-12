import LeadsTable from "./components/leads-table";
import LeadsPagination from "./components/leads-pagination";
import AddLead from "./components/add-lead";
import SearchInput from "./components/search-input";
import SortButton from "./components/sort-button";
import { listLeadsLeadsListGet } from "../api-client/sdk.gen";
import { Stack, Group, Button, Title, Text } from '@mantine/core';
import { IconCircleArrowDown } from '@tabler/icons-react';

export default async function Home() {
  const results = await listLeadsLeadsListGet();
  const leads = results.data?.leads || [];
  return (
    <Stack>
      <Group justify="space-between">
        <Title >Leads</Title>
        <Group>
          <AddLead/>
          <Button leftSection={<IconCircleArrowDown size={16} />}>
            Export All
          </Button>
        </Group>
      </Group>
      <Group>
        <SearchInput/>
        <SortButton/>
      </Group>
      <Stack gap="xs">
        <Text c="dimmed" size="xs">
          Showing 1-10 of {leads.length} leads
        </Text>
        <LeadsTable leads={leads}/>
      </Stack>
      <Group justify="center">
        <LeadsPagination total={leads.length}/>
      </Group>
    </Stack>
  );
}
