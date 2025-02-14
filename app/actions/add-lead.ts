'use server';
import { createLeadApiLeadsPost } from "@/api-client/sdk.gen";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

export async function addLead(path: string, formData: unknown) {
  console.log('formData', formData); 

  const LeadSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    company: z.string(),
  });

  const parsedData = LeadSchema.safeParse(formData);

  if (!parsedData.success) {
    throw new Error('Invalid form data');
  }

  const data = parsedData.data;

  createLeadApiLeadsPost({ 
    body: {
      name: data.name,
      email: data.email,
      company: data.company,
    }
  }).then(() => {
    revalidatePath(path);
  }).catch((error) => {
    console.error('Error adding lead', error);
  }).finally(() => {
    console.log('Add lead complete');
  });

  // revalidatePath(path);
}