import {fetchLatestImages} from "@/app/lib/data";

export default async function Images() {
  const images = await fetchLatestImages();

  return (
    <div className="images flex-grow">
      <p>Images</p>
      <pre>{JSON.stringify(images, null, 2)}</pre>
    </div>
  );
}
