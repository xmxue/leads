'use client';

// import { useState } from 'react';
import { Button, Modal, TextInput, NumberInput, Select, Group} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';

export default function AddLead() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: 'controlled',
    initialValues: { name: '', email: '', company: '', stage: 0, engaged: 'No', last_contacted: new Date() },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
      company: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="New Lead">
        <form onSubmit={form.onSubmit(() => close())}>
          <TextInput {...form.getInputProps('name')} label="Name" placeholder="Name" />
          <TextInput {...form.getInputProps('email')} mt="xs" label="Email" placeholder="Email" />
          <TextInput {...form.getInputProps('company')} mt="xs" label="Company" placeholder="Company" />
          <NumberInput
            {...form.getInputProps('stage')}
            mt="xs"
            label="Stage"
            // placeholder="Stage"
            min={0}
            max={3}
            step={1}
          />
          <Select
            {...form.getInputProps('engaged')}
            mt="xs"
            label="Engaged"
            data={['Yes', 'No']}
            defaultValue={'No'}
            allowDeselect={false}
          />
          <DateInput {...form.getInputProps('last_contacted')} mt="xs" label="Last Contacted" placeholder="Last Contacted" />
          <Group justify="right" >
            <Button type="submit" mt="xs">
              Add
            </Button>
          </Group>
        </form>
      </Modal>
      <Button leftSection={<IconPlus size={16} />} variant="default" onClick={open}>
        Add Lead
      </Button>
    </>
  );
}