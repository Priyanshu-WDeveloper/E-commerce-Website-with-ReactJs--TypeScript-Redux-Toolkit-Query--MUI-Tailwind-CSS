import { apiSlicess } from "../utils/rtk";

import {
  CategoryResponse,
  Product,
  ProductData,
  ProductsResponse,
} from "../types/productTypes";
import { END_POINTS } from "../constants/url";
type CommonResponseType = {
  statusCode: number;
  message: string;
  products: Product[];
  total: number;
  // data: {
  //   products?: any;
  // };
};
export const ProductDataApi = apiSlicess.injectEndpoints({
  endpoints: (builder) => ({
    getProductData: builder.query<
      CommonResponseType & { data: ProductsResponse },
      {
        limit?: number;
        skip?: number;
        search?: string;
        category?: string;
        sort?: string;
        order?: string;
      }
      // { limit?: number; skip?: number; search?: string }
    >({
      query: ({ skip, limit, search, category, sort, order }) => {
        let url = END_POINTS.products;

        if (category) {
          url = `${END_POINTS.products}/category/${category}`;
          const params = [];
          if (limit) params.push(`limit=${limit}`);
          if (skip) params.push(`skip=${skip}`);
          if (params.length > 0) url += `?${params.join("&")}`;
        } else if (search) {
          // url = "/";
          url = `${END_POINTS.products}/search`;

          const params = [];
          if (search) params.push(`q=${search}`);
          // if (search) params.push(`search?q=${search}`);
          if (params.length > 0) url += `?${params.join("&")}`;
          // if (params.length > 0) url += `${params.join("&")}`;
        } else {
          url = END_POINTS.products;
          const params = [];
          if (limit) params.push(`limit=${limit}`);
          if (skip) params.push(`skip=${skip}`);
          if (sort && order) params.push(`sortBy=${sort}&order=${order}`);
          if (params.length > 0) url += `?${params.join("&")}`;
        }

        return {
          url,
          method: "GET",
        };
      },
    }),
    getProductDataById: builder.query<ProductData, { id: string }>({
      // using only ProductData bcause we are using it in the query
      query: ({ id }) => ({
        url: `${END_POINTS.products}/${id}`,
        method: "GET",
      }),
    }),
    getSimpleData: builder.query<
      CommonResponseType & { data: ProductsResponse }, //response.data.products
      void
    >({
      query: () => {
        return { url: END_POINTS.products, method: "GET" };
      },
    }),
    getCategoryList: builder.query<CategoryResponse, void>({
      //response.products
      query: () => ({
        url: `${END_POINTS.products}/category-list`,
        method: "GET",
      }),
    }),
    getProductDataByCategory: builder.query<
      CommonResponseType & { data: ProductsResponse }, //response.data.products
      string
    >({
      query: (category) => ({
        url: `${END_POINTS.products}/category/${category}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductDataQuery,
  useLazyGetProductDataQuery,
  useGetProductDataByIdQuery,
  useLazyGetProductDataByIdQuery,
  useGetSimpleDataQuery,
  useLazyGetSimpleDataQuery,
  useGetProductDataByCategoryQuery,
  useLazyGetProductDataByCategoryQuery,
  useGetCategoryListQuery,
  useLazyGetCategoryListQuery,
} = ProductDataApi;
