'use client';

import { Button, Menu, Group, Chip } from '@mantine/core';
import { IconArrowsSort } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";


interface SortButtonProps {
  sort_order: string | undefined;
  secondary_sort_order: string | undefined;
}

export default function SortButton({ sort_order, secondary_sort_order }: SortButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [opened, setOpened] = useState(false);
  const [stageValue, setStageValue] = useState<string | undefined>(sort_order);
  const [lastContactedValue, setLastContactedValue] = useState<string | undefined>(secondary_sort_order);

  const handleStageClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === stageValue) {
      setStageValue(undefined);
    }
  };

  const handleLastContactedClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === lastContactedValue) {
      setLastContactedValue(undefined);
    }
  };

  const handleApply = () => {
    setOpened(false);

    const params = new URLSearchParams(searchParams);
    if (stageValue !== undefined) {
      params.set('sort_order', stageValue);
    }
    
    if (lastContactedValue !== undefined) {
      params.set('secondary_sort_order', lastContactedValue);
    }

    router.replace(`?${params.toString()}`);
  }
  
  return (
    <Menu opened={opened} onChange={setOpened} shadow="md" width={200}>
      <Menu.Target>
        <Button leftSection={<IconArrowsSort size={16} />} variant="default">
          Sort
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Sort by Stage</Menu.Label>
        <Chip.Group multiple={false} value={stageValue} onChange={setStageValue}>
          <Group justify="center" my='xs'>
            <Chip value="desc" size='xs' onClick={handleStageClick}>
              Highest
            </Chip>
            <Chip value="asc" size='xs' onClick={handleStageClick}>
              Lowest
            </Chip>
          </Group>
        </Chip.Group>
        <Menu.Divider />
        <Menu.Label>Sort by Last Contacted</Menu.Label>
        <Chip.Group multiple={false} value={lastContactedValue} onChange={setLastContactedValue}>
          <Group justify="center" my='xs'>
            <Chip value="desc" size='xs' onClick={handleLastContactedClick}>
              Newest
            </Chip>
            <Chip value="asc" size='xs' onClick={handleLastContactedClick}>
              Oldest
            </Chip>
          </Group>
        </Chip.Group>
        <Menu.Divider />
        <Group justify='flex-end'>
          <Button onClick={handleApply}>Apply</Button>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
}