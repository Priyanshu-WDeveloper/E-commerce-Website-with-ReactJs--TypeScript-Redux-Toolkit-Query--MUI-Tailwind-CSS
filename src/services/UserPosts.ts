import { END_POINTS } from "../constants/url";
import { Post } from "../types/userPosts";
import { apiSlicess } from "../utils/rtk";

type CommonResponseType = {
  statusCode: number;
  message: string;
  total: number;
};

const UserPostApi = apiSlicess.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      CommonResponseType & { posts: Post[] }, // Response type response.products (!response.data.products)
      {
        limit?: number;
        skip?: number;
      }
    >({
      query: ({ limit, skip }) => ({
        url: `${END_POINTS.posts}?limit=${limit}&skip=${skip}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useLazyGetPostsQuery } = UserPostApi;
