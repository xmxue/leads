'use client';

// import { useState } from 'react';
import { Button, Modal, TextInput, Group} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { addLead } from '../actions/add-lead';

export default function AddLeadButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: 'controlled',
    initialValues: { name: '', email: '', company: ''},
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
      company: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="New Lead">
        <form onSubmit={form.onSubmit((values) => {
          close();
          addLead(values);
          form.reset();
        })}>
          <TextInput {...form.getInputProps('name')} label="Name" placeholder="Name" />
          <TextInput {...form.getInputProps('email')} mt="xs" label="Email" placeholder="Email" />
          <TextInput {...form.getInputProps('company')} mt="xs" label="Company" placeholder="Company" />          
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