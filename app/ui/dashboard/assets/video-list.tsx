import { IVideo } from '@/app/lib/models/dtos';
import { calcFileSize } from '@/app/lib/utils/image-utils';
import VideoPlayer from '@/app/ui/media/video-player';

export function VideoList({ videos }: { videos: IVideo[] }) {
  return (
    <div className="images flex-grow">
      {/*<VideoPlayer key={video.id} src={video.cloudUrl}/>*/}
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {videos.map((item) => (
          <li key={item.id} className="relative">
            <div
              className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img
                alt=""
                src={item.mainThumbnail}
                className="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
              />
              <button type="button" className="absolute inset-0 focus:outline-hidden">
                <span className="sr-only">View details for {item.title}</span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{item.title}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">{calcFileSize(item.fileSize)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
