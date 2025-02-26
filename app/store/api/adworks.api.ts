import { IImage, IToken, IUser, IVideo } from '@/app/lib/models/dtos';
import baseQueryWithReauth from '@/app/store/api/base-query-with-reauth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const adworksApi = createApi({
  reducerPath: 'adworksApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getVideos: builder.query<IVideo[], { pageIndex: number, pageSize: number, category: string }>({
      query: (arg) => {
        const { pageIndex, pageSize, category } = arg;
        return {
          url: 'videos',
          params: { pageIndex, pageSize, category },
        };
      }
    }),
    getImages: builder.query<IImage[], { pageIndex: number, pageSize: number, category: string }>({
      query: (arg) => {
        const { pageIndex = 0, pageSize = 12, category = '' } = arg;
        return {
          url: 'images',
          params: { pageIndex, pageSize, category },
        };
      }
    }),
    addWatermarkToImage: builder.mutation<IImage, { image: IImage, text: string }>({
      query: (arg) => {
        const { image, text } = arg;
        return {
          url: `images/add_text/`,
          method: 'PUT',
          body: { ...image, textToAdd: text },
        };
      }
    }),
    getImageById: builder.query<IImage, { id: string }>({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `images/${id}`,
        };
      },
    }),
    updateImage: builder.mutation<IImage, Partial<IImage> & Pick<IImage, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `images/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: IImage }, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response.status,
      invalidatesTags: [],
    }),
    getCurrentUser: builder.query<IUser, void>({
      query: () => `users/current}`,
      transformResponse: (rawResult: IUser, meta) => {
        //                                                        ^
        // The optional `meta` property is available based on the type for the `baseQuery` used
        // The return value for `transformResponse` must match `ResultType`
        return rawResult;
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response.status,
    }),
    login: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: 'account/login',
          method: 'POST',
          body: { email, password }
        };
      }
    }),
    validateToken: builder.mutation<boolean, { token: string }>({
      query: ({ token }) => {
        return {
          url: 'account/validate_token',
          method: 'POST',
          body: { token }
        };
      }
    }),
    refreshToken: builder.mutation<IToken, void>({
      query: () => {
        return {
          url: 'account/refresh_token',
          method: 'POST',
        };
      }
    }),
    resetPassword: builder.mutation({
      query: ({ email, password, confirmPassword, code }) => {
        return {
          url: 'account/reset_password',
          method: 'POST',
          body: { email, password, confirmPassword, code }
        };
      }
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'account/logout',
        method: 'POST',
      })
    }),
  }),
});

export const {
  useGetImagesQuery,
  useGetImageByIdQuery,
  useAddWatermarkToImageMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
  useValidateTokenMutation,
  useGetVideosQuery,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} = adworksApi;
