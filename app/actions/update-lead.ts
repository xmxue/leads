'use server';

import { updateLeadApiLeadsLeadIdPatch } from "@/api-client";
import { LeadUpdateInfo } from "@/api-client";
import { revalidatePath } from "next/cache";

export async function updateLead(path: string, leadId: number, formData: unknown) {
  // could use zod to validate the formData here
  const data = formData as LeadUpdateInfo;

  updateLeadApiLeadsLeadIdPatch(
    {
      path: {
        lead_id: leadId
      },
      body: data
    }
  );

  revalidatePath(path);
}
