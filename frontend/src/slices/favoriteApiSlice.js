import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/favorite";

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavoriteNumber: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/favoriteNumber`,
        method: "POST",
        body: data,
      }),
    }),
    getFavorited: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/favorited`,
        method: "POST",
        body: data,
      }),
    }),
    addToFavorite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addToFavorite`,
        method: "POST",
        body: data,
      }),
    }),
    removeFromFavorite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/removeFromFavorite`,
        method: "POST",
        body: data,
      }),
    }),
    getFavoredMovies: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getFavoredMovies`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFavoriteNumberMutation,
  useGetFavoritedMutation,
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
  useGetFavoredMoviesMutation,
} = favoriteApiSlice;
