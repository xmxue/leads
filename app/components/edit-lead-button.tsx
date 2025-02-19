'use client';
import { Button, Menu, ActionIcon, Group, Modal, NumberInput, Select } from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { deleteLead } from '../actions/delete-lead';
import { updateLead } from '../actions/update-lead';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function EditLeadButton({leadId, stage, engaged, last_contacted}: {leadId: number, stage: number, engaged: boolean, last_contacted: Date}) {
  const pathname = usePathname();
  
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [updateModalOpened, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [engagedValue, setEngagedValue] = useState(engaged ? 'Yes' : 'No');
  const form = useForm({
    mode: 'controlled',
    initialValues: { stage: stage, engaged: engaged, last_contacted: last_contacted },
  });

  const handleDelete = () => {
    deleteLead(pathname, leadId);
    closeDeleteModal();
  }

  const handleUpdate = () => {
    updateLead(pathname, leadId, form.values);
    closeUpdateModal();
    form.reset();
  }

  return (
    <>
      <Modal opened={updateModalOpened} onClose={closeUpdateModal} title="Update Lead">
        <form onSubmit={form.onSubmit(handleUpdate)}>
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
            value={engagedValue}
            onChange={(value) => {
              setEngagedValue(value ?? 'No');
              form.setFieldValue('engaged', value === 'Yes');
            }}
            allowDeselect={false}
          />
          <DateInput 
            {...form.getInputProps('last_contacted')}
            mt="xs" label="Last Contacted"
            placeholder="Last Contacted" 
          />
          <Group justify="flex-end" mt='lg'>
            <Button onClick={closeUpdateModal}  variant="light">
              Cancel
            </Button>
            <Button type="submit">
              Update
            </Button>
          </Group>
        </form>
      </Modal>

      <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title="Delete Lead">
        Are you sure you want to delete this lead? This action cannot be undone.
        <Group justify="flex-end" mt="lg">
          <Button onClick={closeDeleteModal} variant="light">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="filled">
            Confirm
          </Button>
        </Group>
      </Modal>

      <Menu shadow="md" width={120} position="bottom-start">
        <Menu.Target>
          <ActionIcon variant="transparent" color="gray" aria-label="Settings">
            <IconDotsVertical style={{ width: '70%', height: '70%' }}/>
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={openUpdateModal} leftSection={<IconEdit size={14} />}>
            Update
          </Menu.Item>
          <Menu.Item onClick={openDeleteModal} leftSection={<IconTrash size={14} />}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}