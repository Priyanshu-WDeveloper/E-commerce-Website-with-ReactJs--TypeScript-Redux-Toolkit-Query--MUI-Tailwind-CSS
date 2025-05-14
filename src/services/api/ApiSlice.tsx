import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponse,
  Product,
  ProductData,
  ProductsResponse,
} from "../../types/productTypes";
const URL = "https://dummyjson.com/products";
type CommonResponseType = {
  statusCode: number;
  message: string;
  products: Product[];
  total: number;
  // data: {
  //   products?: any;
  // };
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
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
        // let url = `?limit=${limit}&skip=${skip}&search?q=${search}`; //? {()}
        // return {                   //? {}
        //   url: url,
        //   method: "GET",
        // };
        // let url = URL;
        // if (limit) {
        //   url += `?limit=${limit}`;
        // }
        // if (skip) {
        //   url += `&skip=${skip}`;
        // }
        // if (search) {
        //   url += `&search=${search}`;
        // }
        // if (category) {
        //   url += `&category/${category}`;
        let url = "";
        if (category) {
          url = `/category/${category}`;
          const params = [];
          if (limit) params.push(`limit=${limit}`);
          if (skip) params.push(`skip=${skip}`);
          if (params.length > 0) url += `?${params.join("&")}`;
        } else if (search) {
          url = "/";
          const params = [];
          if (search) params.push(`search?q=${search}`);
          if (params.length > 0) url += `${params.join("&")}`;
        } else {
          url = "";
          const params = [];
          if (limit) params.push(`limit=${limit}`);
          if (skip) params.push(`skip=${skip}`);
          if (sort && order) params.push(`sortBy=${sort}&order=${order}`);
          // if (search) params.push(`search?q=${search}`);
          if (params.length > 0) url += `?${params.join("&")}`;
        }

        return {
          url,
          method: "GET",
        };
      },
    }),
    getProductDataById: builder.query<
      CommonResponseType & { data: ProductData },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getSimpleData: builder.query<
      CommonResponseType & { data: ProductsResponse },
      void
    >({
      query: () => {
        return { url: URL, method: "GET" };
      },
    }),
    getCategoryList: builder.query<
      CommonResponseType & { data: CategoryResponse },
      void
    >({
      query: () => ({
        url: `/category-list`,
        method: "GET",
      }),
    }),
    getProductDataByCategory: builder.query<
      CommonResponseType & { data: ProductsResponse },
      string
    >({
      query: (category) => ({
        url: `/category/${category}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLazyGetProductDataQuery,
  useLazyGetProductDataByIdQuery,
  useGetSimpleDataQuery,
  useLazyGetSimpleDataQuery,
  useGetProductDataByCategoryQuery,
  useLazyGetProductDataByCategoryQuery,
  useGetCategoryListQuery,
  useLazyGetCategoryListQuery,
} = apiSlice;
