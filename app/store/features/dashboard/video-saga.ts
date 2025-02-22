import videoService from '@/app/lib/services/video-service';
import { dashboardActions, videoUploaded } from '@/app/store/features/dashboard/dashboard-slice';
import { call, put, takeEvery } from '@redux-saga/core/effects';
import { Action, type PayloadAction } from '@reduxjs/toolkit';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function* createThumbnailsAsync(action: PayloadAction<{id: string}>) {
  const { id } = action.payload;
  const links: string[] = yield call(videoService.createThumbnails, id)
  yield put(dashboardActions.thumbnailsCreated({id, thumbnails: links}))
}

export function* watchVideoUploadAsync() {
  yield takeEvery(dashboardActions.generateThumbnails.type, createThumbnailsAsync)
}

export function* watchVideoPlayingAsync() {
 //TODO
 console.log('redux saga testing, watchVideoPlaying');
}
