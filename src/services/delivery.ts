import { apiSlicess } from "../utils/rtk";
import { END_POINTS } from "../constants/url";

const deliveryApi = apiSlicess.injectEndpoints({
  endpoints: (builder) => ({
    checkDelivery: builder.query({
      query: (pincode) => ({
        url: `${END_POINTS.checkDelivery}/${pincode}`,
        method: "GET",
      }),
    }),
    suggestPincodes: builder.query({
      query: (partial) => ({
        url: `${END_POINTS.suggestPincodes}?query=${partial}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useCheckDeliveryQuery, useSuggestPincodesQuery } = deliveryApi;
