'use client';
import { IImage } from '@/app/lib/models/dtos';
import { calcFileSize } from '@/app/lib/utils/image-utils';
import { ImagePlaceholder } from '@/app/ui/dashboard/assets/image-placeholder';
import { ImageView } from '@/app/ui/dashboard/assets/image-view';
import { useImageRefs } from '@/app/ui/dashboard/assets/image-hooks';

export function ImageList({ images}: { images: IImage[] }) {

  const imageRefs = useImageRefs(images.length);

  const handleImageClick = (imageRef: any) => {
    imageRef.current!.scroll();
  }

  const imageContent = images.map((image, i) => {
    const previewContent = image && image.cloudUrl ? (
      <ImageView ref={imageRefs[i]} image={image} handleImageClick={handleImageClick} />
    ) : (
      <ImagePlaceholder width={512} height={512} key={i} />
    );
    return (
      <li key={image.id}>
        {previewContent}
      </li>
    );
  });
  return (
    <div className="images flex-grow">
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <li key={image.id} className="relative">
            <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img
                alt=""
                src={image.cloudUrl}
                className="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
              />
              <button type="button" className="absolute inset-0 focus:outline-hidden">
                <span className="sr-only">View details for {image.title}</span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{image.title}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">{calcFileSize(image.fileSize)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

