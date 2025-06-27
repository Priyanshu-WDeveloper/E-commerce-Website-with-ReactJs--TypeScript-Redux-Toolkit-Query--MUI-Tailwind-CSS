import * as Sentry from "@sentry/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Drawer, Pagination } from "@mui/material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import Bookcard from "./Bookcard";
import { RootState } from "../app/store";
import Sidebar from "./Sidebar";
import { Product } from "../types/productTypes";
import { useLazyGetProductDataQuery } from "../services/ProductData";
import NoProductsFound from "../components/NoProductsFound";
import LoadingBackdrop from "../components/Backdrop";
import DrawerList from "../components/DrawerList";
import { errToast, toast } from "../helpers/toast";

const MainContent = () => {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  // const [notification, setNotification] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [getProduct] = useLazyGetProductDataQuery();
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useSelector((state: RootState) => state.filter);

  const itemPerPage = 12;
  const limit = itemPerPage;
  const skip = (pages - 1) * limit;
  const sort = "title";
  const order = "asc";
  // const skip = (currentPage - 1) * limit;
  // const category = selectedCategory;
  const isMounted = useRef(true);

  const getProductData = async () => {
    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        limit,
        skip,
      };
      if (selectedCategory) {
        params.category = selectedCategory;
      } else if (keyword) {
        params.search = keyword;
      } else {
        params.sort = sort;
        params.order = order;
      }
      // const result = await getProduct({ limit, skip, sort, order });
      const result = await getProduct(params); //unwrap() is a helper method provided by RTK Query's mutation and query hooks (like useLazyGetProductDataQuery) only on the promise returned by the trigger function (not on the result object itself).
      // console.log(result);
      if (isMounted.current && result && result.data?.statusCode === 200) {
        setProducts(result.data.data?.products || []);
        setTotalItems(result.data.data?.total || 0);
        // setNotification(result?.data?.products || []);
        // console.log("Products:", notification);
      } else {
        setProducts([]);
        setTotalItems(0);
        // showToast("Error fetching products", "error");
        errToast("Error fetching products");
        setIsLoading(false);
      }
      setIsLoading(false);
      if (isMounted.current) setIsLoading(false);
    } catch (error) {
      // console.error("Error fetching products:", error);
      if (import.meta.env.MODE !== "development") {
        Sentry.captureException(error);
      } else {
        console.log(" Error fetching products");

        console.error("Caughttt errorrrr:", error);
      }
      // setProducts([]);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    // if (isMounted) {
    //   getProductData();
    // }
    getProductData();
    return () => {
      isMounted.current = false; // Cleanup function to avoid memory leaks
    };
  }, [limit, skip, selectedCategory, keyword, sort, order]);
  // useEffect(() => {
  //   if (selectedCategory) {
  //     trigger({ limit, skip, category: selectedCategory });
  //     // .then((res) => {
  //     //   console.log("API Response for category:", selectedCategory, res);
  //     // });
  //     // console.log("selectedCategoryyyyyyyyyyyy", selectedCategory);
  //   } else if (keyword) {
  //     trigger({ limit, skip, search: keyword });
  //     // .then((res) => {
  //     //   console.log("API Response for search:", res, keyword);
  //     // });
  //   } else {
  //     trigger({ limit, skip, sort, order });
  //     // trigger({ limit, skip, sort, order }).then((res) =>
  //     //   console.log("ress", res)
  //     // );
  //   }
  // }, [trigger, limit, skip, selectedCategory, keyword, sort, order]);

  const getFilteredProducts = () => {
    let filteredProducts = [...products]; //? [...products] is shallow copy
    // if (selectedCategory) {
    //   filteredProducts = filteredProducts.filter((product) => {
    //     console.log("Product Category", product.category);
    //     console.log("SelectedCategory", selectedCategory);
    //     console.log(filteredProducts);

    //     return product.category === selectedCategory;
    //   });
    // }
    // console.log(filteredProducts);

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (filter) {
      case "expensive":
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case "cheap":
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case "popular":
        return [...filteredProducts].sort((a, b) => b.rating! - a.rating!);
      default:
        return filteredProducts;
    }
  };
  const filteredProducts = getFilteredProducts();
  // console.log(filteredProducts);

  const totalPages = Math.ceil(totalItems / itemPerPage);
  const handlePageChanges = (_: React.ChangeEvent<unknown>, value: number) => {
    setPages(value);
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  if (isLoading) {
    return <LoadingBackdrop />;
  }
  return products.length ? (
    <>
      <Sidebar />
      <section className=" ml-60 w-full xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] pt-2 ">
        {/* <Container maxWidth={"md"}> */}
        <Box className="mb-5">
          <Box className="flex flex-col sm:flex-row justify-between items-center ">
            <Box className="relative  mb-1 ">
              {/* <Button
                            variant="text"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <BubbleChartIcon />
                            {filter === 'all'
                                ? 'Filter'
                                : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </Button> */}
              <Button onClick={toggleDrawer(true)}>
                <BubbleChartIcon />
                Filter
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <DrawerList toggleDrawer={toggleDrawer} setFilter={setFilter} />
              </Drawer>
              {/* {
                            dropdownOpen && (
                                <Box className=" bg-white border border-gray-300 rounded mt-2 w-full sm:w-40 ">
                                    <Button
                                        onClick={() => setFilter('cheap')}
                                    >
                                        Cheap
                                    </Button>
                                    <Button
                                        onClick={() => setFilter('expensive')}
                                    >
                                        Expensive
                                    </Button>
                                    <Button
                                        onClick={() => setFilter('popular')}
                                    >
                                        Popular
                                    </Button>

                                </Box>
                            )} */}
            </Box>
          </Box>
          <Box className=" grid grid-cols-4  sm:grid-cols-3 md:grid-cols-4 gap-5 ">
            {/* <Box> */}

            {filteredProducts.map((product) => (
              <Bookcard key={product.id} isLoading={isLoading} data={product} />
            ))}
          </Box>
          {/* <Box className="pt-5 flex justify-center items-center"> */}
          <Box
            sx={{
              pt: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              count={totalPages}
              page={pages}
              onChange={handlePageChanges}
              size="large"
              // color="standard"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "black ",
                  borderColor: "lightgray",
                },
                "& .Mui-selected": {
                  backgroundColor: "black !important",
                  color: "white !important",
                },
              }}
            />
          </Box>
          {/* <CustomPagination
                module={notification}
                page={pageChange}
                onPageChange={onPageChange}
                totalPages={totalPages}
              /> */}

          {/* <Box className="flex flex-col sm:flex-row justify-between items-center mt-5 pt-7 ">
                previous
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderRadius: "24px" }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className=" border px-4 py-2 mx-2 rounded-full "
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                1,2,3,4,5
                <Box className="flex flex-wrap justify-center ">
                 pagination Button
                  {getPaginationButton().map((page) => (
                    <Button
                      variant="contained"
                      key={page}
                      sx={{
                        backgroundColor:
                          page === currentPage ? "black" : "white",
                        color: page === currentPage ? "white" : "black",
                        borderRadius: "5rem",
                        marginRight: "5px",
                      }}
                      onClick={() => handlePageChange(page)}
                      className={`border px-4 py-2 mx-1 rounded-full ${
                        page === currentPage ? "bg-black text-white" : ""
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                next
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ borderRadius: "24px" }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className=" border px-4 py-2 mx-2 rounded-full "
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </Box> */}
        </Box>
      </section>
    </>
  ) : products.length === 0 ? (
    <NoProductsFound
    //  onReset={handleResetFilters}
    />
  ) : (
    <p>No Product</p>
  );
};

export default MainContent;
