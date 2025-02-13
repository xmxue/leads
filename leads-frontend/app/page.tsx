import LeadsTable from "./components/leads-table";
import LeadsPagination from "./components/leads-pagination";
import AddLeadButton from "./components/add-lead-button";
import SearchInput from "./components/search-input";
import { listLeadsLeadsGet } from "@/api-client";
import { Stack, Group, Button, Title} from '@mantine/core';
import { IconCircleArrowDown } from '@tabler/icons-react';
import SortButton from "./components/sort-button";

interface HomeProps {
  search: string | undefined;
  sort_order: string | undefined;
  secondary_sort_order: string | undefined;
}

export default async function Home({ searchParams }: { searchParams: HomeProps }) {
  const { search, sort_order, secondary_sort_order } = await searchParams;
  const sort_by = sort_order !== undefined ? "stage" : undefined;
  const secondary_sort_by = secondary_sort_order !== undefined ? "last_contacted" : undefined;

  const { data } =
    (await listLeadsLeadsGet({
      query: {
        search: search,
        sort_by: sort_by,
        sort_order: sort_order as "desc" | "asc" | undefined,
        secondary_sort_by: secondary_sort_by,
        secondary_sort_order: secondary_sort_order as "desc" | "asc" | undefined,
      },
    })) ?? [];
  const leads = data ?? [];
  
  return (
    <Stack>
      <Group justify="space-between">
        <Title >Leads</Title>
        <Group>
          <AddLeadButton/>
          <Button leftSection={<IconCircleArrowDown size={16} />}>
            Export All
          </Button>
        </Group>
      </Group>
      <Group>
        <SearchInput/>
        <SortButton
          sort_order={sort_order}
          secondary_sort_order={secondary_sort_order}
        />
      </Group>
      <LeadsTable leads={leads} />
      <Group justify="center">
        <LeadsPagination total={leads.length}/>
      </Group>
    </Stack>
  );
}
