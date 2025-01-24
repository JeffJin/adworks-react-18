import {fetchCustomers} from "@/app/lib/data";

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <div className="customers flex-grow">
      <p>Customers</p>
      <pre>{JSON.stringify(customers, null, 2)}</pre>
    </div>
  );
}
