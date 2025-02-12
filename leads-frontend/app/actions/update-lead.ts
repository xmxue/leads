'use server';

import { updateLeadLeadsLeadIdPatch } from "@/api-client";
import { LeadUpdateInfo } from "@/api-client";
import { revalidatePath } from "next/cache";

export async function updateLead(leadId: number, formData: unknown) {
  console.log('formData', formData);

  const data = formData as LeadUpdateInfo;

  await updateLeadLeadsLeadIdPatch(
    {
      path: {
        lead_id: leadId
      },
      body: data
    }
  );

  revalidatePath('/');
}
