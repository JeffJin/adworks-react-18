import { IDevice, IImage, IPlaylist, ITask, IUser, IVideo, TaskStatus } from '@/app/lib/models/dtos';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IDashboardState {
  devices: IDevice[];
  playlists: IPlaylist[];
  videos: IVideo[];
  images: IImage[];
  tasks: ITask[];
}

const initialState: IDashboardState = {
  devices: [],
  playlists: [],
  videos: [],
  images: [],
  tasks: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    initialize: (state) => {
      //TODO load initial data from local storage
      return { ...initialState };
    },
    videosLoaded: (state, action: PayloadAction<IVideo[]>) => {
      state.videos = action.payload;
    },
    videoUploaded: (state, action: PayloadAction<IVideo>) => {
      const index = state.videos.findIndex(img => img.id === action.payload.id);
      if(index == -1) {
        state.videos.push(action.payload);
      } else {
        console.error('Error in videos uploaded', action.payload);
      }
    },
    videoUpdated: (state, action: PayloadAction<IVideo>) => {
      const index = state.videos.findIndex(img => img.id === action.payload.id);
      if(index > -1) {
        state.videos[index] = action.payload;
      }
    },
    imagesLoaded: (state, action: PayloadAction<IImage[]>) => {
      state.images = action.payload;
    },
    imageUploaded: (state, action: PayloadAction<IImage>) => {
      state.images.push(action.payload);
    },
    imageWatermarkAdded: (state, action: PayloadAction<IImage>) => {
      state.images.push(action.payload);
    },
    imageUpdated: (state, action: PayloadAction<IImage>) => {
      const index = state.images.findIndex(img => img.id === action.payload.id);
      if(index > -1) {
        state.images[index] = action.payload;
      }
    },
    generateThumbnails: (state, action: PayloadAction<{id: string}>) => {
      const index = state.tasks.findIndex(task => task.assetId === action.payload.id);
      if(index > -1) {
        state.tasks[index].status = TaskStatus.STARTED;
      } else {
        state.tasks.push({assetId: action.payload.id, type: 'generateThumbnails', status: TaskStatus.STARTED});
      }
    },
    thumbnailsCreated: (state, action: PayloadAction<{id: string, thumbnails: string[]}>) => {
      const index = state.videos.findIndex(v => v.id === action.payload.id);
      if(index > -1) {
        state.videos[index].thumbnails = action.payload.thumbnails;
      }
    },
  },
});
export const {
  initialize,
  videosLoaded,
  videoUploaded,
  videoUpdated,
  imagesLoaded,
  imageUploaded,
  imageWatermarkAdded,
  imageUpdated,
  thumbnailsCreated
} = dashboardSlice.actions;
export const dashboardActions = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
