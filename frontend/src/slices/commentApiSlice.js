import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/comment";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/saveComment`,
        method: "POST",
        body: data,
      }),
    }),
    getComments: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/getComments`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveCommentMutation,
  useGetCommentsQuery
} = commentApiSlice;
