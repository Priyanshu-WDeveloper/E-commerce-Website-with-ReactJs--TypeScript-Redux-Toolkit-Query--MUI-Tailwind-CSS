// export const API_URL = "http://localhost:3500";
export const API_URL = import.meta.env.VITE_BACK_URI;

export const END_POINTS = {
  login: "/auth",
  signup: "/register",

  users: "/users",

  dummyusers: "/api/dummy/users",
  posts: "/api/dummy/posts",

  products: "/api/dummy/products",
  productCategories: "/api/dummy/product-categories",
};
