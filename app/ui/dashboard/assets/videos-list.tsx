import {fetchLatestVideos} from "@/app/lib/services/data";
import VideoPlayer from '@/app/ui/media/video-player';

export async function VideosList() {
  const videos = await fetchLatestVideos();
  const src = videos[0].sources[0];
  return (

    <div className="videos flex-grow">
      <VideoPlayer src={src} />
    </div>
  );
}
