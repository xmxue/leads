'use client';

import { Button, Menu, Group, SegmentedControl } from '@mantine/core';
import { IconArrowsSort } from '@tabler/icons-react';
// import { useDisclosure } from '@mantine/hooks';
// import { useForm } from '@mantine/form';


export default function SortButton() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button leftSection={<IconArrowsSort size={16} />} variant="default">
          Sort
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Sort by Stage</Menu.Label>
        <SegmentedControl data={['Ascend', 'Descend']} fullWidth/>
        <Menu.Divider />
        <Menu.Label>Sort by Last Contacted</Menu.Label>
        <SegmentedControl data={['Latest', 'Oldest']} fullWidth/>
        <Menu.Divider />

        <Group justify='space-between'>
          <Button variant='white'>Reset</Button>
          <Button>Apply</Button>
        </Group>
      </Menu.Dropdown>

    </Menu>
    
  );
}