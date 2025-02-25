import { IImage, ITask, TaskStatus } from '@/app/lib/models/dtos';
import { adworksApi } from '@/app/store/api/adworks.api';
import { getImageInfo } from '@/app/lib/utils/image-utils';
import { RootState } from '@/app/store/store';
import { Action, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import {
  dashboardActions,
  dashboardReducer, IDashboardState,
} from './dashboard-slice';

// Create the middleware instance and methods
export const imageListenerMiddleware = createListenerMiddleware();
const DEFAULT_WATERMARK_TEXT = 'adworks rocks';
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
imageListenerMiddleware.startListening({
  actionCreator: dashboardActions.imageUploaded,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('image file uploaded:', action.payload.cloudUrl);

    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    // Run async logic
    const imageInfo = await getImageInfo(action.payload.cloudUrl);
    console.log('image info loaded:', imageInfo);

    // Pause until action dispatched or state changed
    if (await listenerApi.condition((action, currentState) => {
      console.log(action, currentState);
      // const task = currentState.tasks.find((t: ITask) =>
      //   t.assetId === action.payload.id);
      // return task && task.type == 'ADD_WATERMARK' && task.status == TaskStatus.COMPLETED;
      return true;

    }, 50)) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      listenerApi.dispatch(dashboardActions.imageWatermarkAdded(action.payload));

      // Spawn "child tasks" that can do more work and return results
      const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        await forkApi.delay(5);
        // Complete the child by returning a value
        return 42;
      });

      const result = await task.result;
      // Unwrap the child result in the listener
      if (result.status === 'ok') {
        // Logs the `42` result value that was returned
        console.log('Child succeeded: ', result.value);
      }
    }
  },
});
