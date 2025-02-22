'use client'
import { IImage } from '@/app/lib/models/dtos';
import { useGetImagesQuery } from '@/app/lib/services/adworks.api';
import "./images.scss";
import Loading from '@/app/ui/common/loading';
import LoadingWarning from '@/app/ui/common/loading-warning';
import { useDebounce } from '@/app/ui/dashboard/assets/image-hooks';
import { ImageList } from '@/app/ui/dashboard/assets/image-list';
import { warnings } from '@/app/ui/messages/errors';

export default function ImagesClient() {
  const { data = [], error, isLoading, refetch } = useGetImagesQuery({
      pageIndex: 0, pageSize: 10, category: ''
    }, {
      selectFromResult: (data) =>
        data ?? []
    });
  const images = data as IImage[];
  const deferredImages = useDebounce(images, 1500);
  return (
    <div className="images flex-grow">
      <button onClick={refetch}>Reload</button>

      { error ? (
        <LoadingWarning title={warnings.loading.title} description={warnings.loading.description} />
      ) : isLoading ? (
        <LoadingWarning title={warnings.loading.title} description={warnings.loading.description} />
      ) : data ? (
        <ul>
          <ImageList images={deferredImages} />
        </ul>
      ) : null }
    </div>
  )
}
