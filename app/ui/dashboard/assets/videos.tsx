import {fetchLatestVideos} from "@/app/lib/data";

export async function Videos() {
  const videos = await fetchLatestVideos();

  return (
    <div className="videos flex-grow">
      <p>Videos</p>
      <pre>{JSON.stringify(videos, null, 2)}</pre>
    </div>
  );
}
