import { apiSlicess } from "../utils/rtk";

import {
  CategoryResponse,
  Product,
  ProductData,
  ProductsResponse,
} from "../types/productTypes";
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
        let url = "api/dummy/products";
        // console.log(url);

        if (category) {
          url = `api/dummy/products/category/${category}`;
          const params = [];
          if (limit) params.push(`limit=${limit}`);
          if (skip) params.push(`skip=${skip}`);
          if (params.length > 0) url += `?${params.join("&")}`;
        } else if (search) {
          // url = "/";
          url = `api/dummy/products/search`;

          const params = [];
          if (search) params.push(`q=${search}`);
          // if (search) params.push(`search?q=${search}`);
          if (params.length > 0) url += `?${params.join("&")}`;
          // if (params.length > 0) url += `${params.join("&")}`;
        } else {
          url = "api/dummy/products";
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
    getProductDataById: builder.query<ProductData, { id: string }>({
      // using only ProductData bcause we are using it in the query
      query: ({ id }) => ({
        url: `api/dummy/products/${id}`,
        method: "GET",
      }),
    }),
    getSimpleData: builder.query<
      CommonResponseType & { data: ProductsResponse }, //response.data.products
      void
    >({
      query: () => {
        return { url: "api/dummy/products", method: "GET" };
      },
    }),
    getCategoryList: builder.query<CategoryResponse, void>({
      //response.products
      query: () => ({
        url: `api/dummy/products/category-list`,
        method: "GET",
      }),
    }),
    getProductDataByCategory: builder.query<
      CommonResponseType & { data: ProductsResponse }, //response.data.products
      string
    >({
      query: (category) => ({
        url: `api/dummy/products/category/${category}`,
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
