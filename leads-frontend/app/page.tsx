import LeadsTable from "./components/leads-table";
import { listLeadsLeadsListGet } from "../api-client/sdk.gen";

export default async function Home() {
  const results = await listLeadsLeadsListGet();
  return (
    <>
      <h1>Leads</h1>
      <LeadsTable leads={results.data?.leads || []}/>
    </>
  );
}
