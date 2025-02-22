import { watchVideoPlayingAsync, watchVideoUploadAsync } from '@/app/store/features/dashboard/video-saga';
import { all } from '@redux-saga/core/effects';

export default function* rootSaga() {
  yield all([
    watchVideoUploadAsync(),
    watchVideoPlayingAsync()
  ])
}
