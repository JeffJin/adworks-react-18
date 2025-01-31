import {fetchLatestDocuments} from "@/app/lib/data";

export function Documents() {
  // const documents = await fetchLatestDocuments();

  return (
    <div className="documents flex-grow">
      <p>Documents</p>
      {/*<pre>{JSON.stringify(documents, null, 2)}</pre>*/}
    </div>
  );
}
