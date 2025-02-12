'use server';

import { deleteLeadLeadsLeadIdDelete } from "@/api-client/sdk.gen";
import { revalidatePath } from "next/cache";

export async function deleteLead(leadId: number) {
  await deleteLeadLeadsLeadIdDelete(
    {
      path: {
        lead_id: leadId
      }
    }
  );

  revalidatePath('/');
}