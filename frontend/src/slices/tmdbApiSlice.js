import { apiSlice2 } from "./apiSlice";

export const tmdbApiSlice = apiSlice2.injectEndpoints({
  endpoints: (builder) => ({
    getMovie: builder.query({
      query: (movieId) => `/movie/${movieId}?language=en-US`,
    }),
    getPopulerMovie: builder.query({
      query: (pageIndex) => `/movie/popular?language=en-US&page=${pageIndex}`,
    }),
    getCasts: builder.query({
      query: (movieId) => `/movie/${movieId}/credits`,
    }),
  }) 
});

export const {
  useGetMovieQuery,
  useGetPopulerMovieQuery,
  useGetCastsQuery,
} = tmdbApiSlice;