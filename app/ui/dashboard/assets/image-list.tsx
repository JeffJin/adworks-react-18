'use client';
import { IImage } from '@/app/lib/models/dtos';
import { ImagePlaceholder } from '@/app/ui/dashboard/assets/image-placeholder';
import { ImagePreview } from '@/app/ui/dashboard/assets/image-preview';
import { useImageRefs } from '@/app/ui/dashboard/assets/image-hooks';

export function ImageList({ images}: { images: IImage[] }) {

  const imageRefs = useImageRefs(images.length);

  const handleImageClick = (imageRef: any) => {
    imageRef.current!.scroll();
  }

  const imageContent = images.map((image, i) => {
    const previewContent = image && image.cloudUrl ? (
      <ImagePreview ref={imageRefs[i]} image={image} handleImageClick={handleImageClick} />
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
    <>
      <div className="images flex-grow">
        <ul>
          {imageContent}
        </ul>
      </div>
    </>
  );
}

