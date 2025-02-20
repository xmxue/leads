'use server';

import { deleteLeadApiLeadsLeadIdDelete } from "@/api-client";
import { revalidatePath } from "next/cache";

export async function deleteLead(path: string,leadId: number) {
  await deleteLeadApiLeadsLeadIdDelete(
    {
      path: {
        lead_id: leadId
      }
    }
  );

  revalidatePath(path);
}