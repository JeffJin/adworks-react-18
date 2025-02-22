import { IUser, IVideo } from '@/app/lib/models/dtos';
import { SERVER_API } from '@/app/lib/settings';

function deleteThumbnail(link: string): Promise<{status: number, msg: string}> {
  const headers = {'Content-Type': 'application/json'};
  const formData = new FormData();
  formData.append('link', link);

  return fetch(`${SERVER_API}/videos/delete_thumb`, {
    method: 'delete',
    body: formData,
    headers
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw Error(response.statusText);
  }).then(result => {
    return result;
  });
}
function createThumbnails(id: string): Promise<string[]> {
  const headers = {'Content-Type': 'application/json'};
  const formData = new FormData();
  formData.append('id', id);

  return fetch(`${SERVER_API}/videos/create_thumbnails`, {
    method: 'post',
    body: formData,
    headers
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw Error(response.statusText);
  }).catch((error) => {
    return Promise.reject(error);
  });
}
export default {
  createThumbnails,
  deleteThumbnail
  ,
};
