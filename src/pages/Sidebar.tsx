// import { useDispatch, useSelector } from "react-redux";
// import React, { useEffect, useMemo, useCallback } from "react";
// import { Box, Container, TextField, Typography, Button } from "@mui/material";
// import {
//   FormControl,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import {
//   setKeyword,
//   setMaxPrice,
//   setMinPrice,
//   setSearchQuery,
//   setSelectedCategory,
// } from "../reducers/FilterSlice";
// import { RootState } from "../app/store";
// // import { useLazyGetCategoryListQuery } from "../services/api/ApiSlice";
// import {
//   useGetCategoryListQuery,
//   useLazyGetCategoryListQuery,
// } from "../services/ProductData";
// import axios from "axios";

// // Predefined keywords for quick filtering
// const KEYWORDS = ["apple", "watch", "shoes", "shirt"];

// // Number of random categories to display
// const CATEGORIES_TO_SHOW = 4;

// // Utility function for debouncing
// const useDebounce = <T,>(callback: (arg: T) => void, delay: number) => {
//   const debouncedFn = useCallback(
//     (arg: T) => {
//       const handler = setTimeout(() => callback(arg), delay);
//       return () => clearTimeout(handler);
//     },
//     [callback, delay]
//   );

//   return debouncedFn;
// };

// const Sidebar = () => {
//   const dispatch = useDispatch();

//   // Get filter state from Redux
//   const { searchQuery, selectedCategory, minPrice, maxPrice } = useSelector(
//     (state: RootState) => state.filter
//   );

//   // Setup API query hook
//   const [fetchCategories, { data: categoriesData, isLoading }] =
//     useLazyGetCategoryListQuery();

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       // setLoading(true);
//   //       // Make a simple GET request without a body
//   //       const response = await axios.get(
//   //         "http://localhost:3500/api/dummy/products"
//   //       );
//   //       console.log(response);

//   //       // if (response.data && response.data.products) {
//   //       //   setProducts(response.data.products);
//   //       // }
//   //       // setError(null);
//   //     } catch (error) {
//   //       console.log(error);
//   //       // setError("Failed to fetch products");
//   //     }
//   //     // finally {
//   //     //   setLoading(false);
//   //     // }
//   //   };

//   //   fetchProducts();
//   // }, []);

//   // const {
//   //   data: categoriesNewData,
//   //   isLoading: isNewCategoriesLoading,
//   //   isError: isNewCategoriesError,
//   //   error,
//   // } = useGetCategoryListQuery();

//   // Debug information
//   // console.log("categoriesNewData:", categoriesNewData);
//   // console.log("isLoading:", isNewCategoriesLoading);
//   // console.log("isError:", isNewCategoriesError);
//   // console.log("error:", error);
//   // Get random categories for display - memoized to prevent recalculation
//   const randomCategories = useMemo(() => {
//     if (
//       !categoriesData ||
//       !Array.isArray(categoriesData) ||
//       categoriesData.length === 0
//     )
//       return [];

//     // Create a copy to avoid mutating the original
//     const shuffled = [...categoriesData];

//     // Fisher-Yates shuffle algorithm
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }

//     return shuffled.slice(0, CATEGORIES_TO_SHOW);
//   }, [categoriesData]);

//   // Fetch categories on component mount - only once
//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // Event handlers with debounce for expensive operations
//   const updateMinPrice = useCallback(
//     (value: string) => {
//       // console.log(value);

//       dispatch(setMinPrice(value ? parseFloat(value) : undefined));
//     },
//     [dispatch]
//   );

//   const updateMaxPrice = useCallback(
//     (value: string) => {
//       // console.log(value);
//       dispatch(setMaxPrice(value ? parseFloat(value) : undefined));
//     },
//     [dispatch]
//   );

//   // Debounced handlers to prevent rapid consecutive dispatches
//   const debouncedUpdateMinPrice = useDebounce<string>(updateMinPrice, 300);
//   const debouncedUpdateMaxPrice = useDebounce<string>(updateMaxPrice, 300);

//   const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     debouncedUpdateMinPrice(value);
//   };

//   const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     debouncedUpdateMaxPrice(value);
//   };

//   const handleRadioChangeCategories = useCallback(
//     (category: string) => {
//       dispatch(setSelectedCategory(category));
//     },
//     [dispatch]
//   );

//   const handleKeywordClick = useCallback(
//     (keyword: string) => {
//       dispatch(setKeyword(keyword));
//       dispatch(setSelectedCategory(""));
//     },
//     [dispatch]
//   );

//   const handleResetFilters = useCallback(() => {
//     dispatch(setSearchQuery(""));
//     dispatch(setMinPrice(undefined));
//     dispatch(setMaxPrice(undefined));
//     dispatch(setKeyword(""));
//     dispatch(setSelectedCategory(""));
//   }, [dispatch]);

//   // Memoized handler for search query to prevent frequent re-renders
//   const handleSearchQueryChange = useDebounce<string>((value: string) => {
//     // console.log(value);

//     dispatch(setSearchQuery(value));
//   }, 300);

//   // Memoize category items to prevent unnecessary re-renders
//   const categoryItems = useMemo(() => {
//     if (isLoading) {
//       return <Typography>Loading categories...</Typography>;
//     }

//     return randomCategories.map((category) => (
//       <FormControl key={category} component="fieldset" fullWidth>
//         <RadioGroup name={`category-group-${category}`}>
//           <FormControlLabel
//             control={<Radio />}
//             checked={category === selectedCategory}
//             onChange={() => handleRadioChangeCategories(category)}
//             value={category}
//             label={category.toUpperCase()}
//           />
//         </RadioGroup>
//       </FormControl>
//     ));
//   }, [
//     randomCategories,
//     selectedCategory,
//     handleRadioChangeCategories,
//     isLoading,
//   ]);

//   // Memoize keyword buttons to prevent unnecessary re-renders
//   const keywordButtons = useMemo(() => {
//     return KEYWORDS.map((keyword) => (
//       <Button
//         key={keyword}
//         variant="outlined"
//         size="small"
//         onClick={() => handleKeywordClick(keyword)}
//         className="mb-2"
//       >
//         {keyword.toUpperCase()}
//       </Button>
//     ));
//   }, [handleKeywordClick]);

//   return (
//     <Box
//       className="h-screen fixed left-0 w-64 overflow-y-auto"
//       sx={{
//         // Use will-change to optimize animations/transitions
//         willChange: "transform",
//         // CSS containment for performance
//         contain: "layout style",
//       }}
//     >
//       <Typography variant="h4" className="text-3xl pl-2.5  font-bold mt-4">
//         Search Store
//       </Typography>

//       <Container>
//         {/* Search input with debounce */}
//         <TextField
//           className="border-2 rounded px-2 py-3 w-full mb-5"
//           sx={{ marginBottom: "10px" }}
//           label="Search Products"
//           variant="standard"
//           defaultValue={searchQuery}
//           onChange={(e) => handleSearchQueryChange(e.target.value)}
//           fullWidth
//           // Improve input performance
//           inputProps={{ enterKeyHint: "search" }}
//         />

//         {/* Price range inputs */}
//         <Box className="flex justify-between items-center gap-2 mb-4">
//           <TextField
//             label="Min Price"
//             className="w-full"
//             defaultValue={minPrice ?? ""}
//             onChange={handleMinPriceChange}
//             variant="outlined"
//             type="number"
//             size="small"
//           />
//           <TextField
//             label="Max Price"
//             className="w-full"
//             defaultValue={maxPrice ?? ""}
//             onChange={handleMaxPriceChange}
//             variant="outlined"
//             type="number"
//             size="small"
//           />
//         </Box>

//         {/* Categories section */}
//         <section className="mb-4">
//           <Typography variant="h6" className="font-semibold mb-2">
//             Categories
//           </Typography>

//           {categoryItems}
//         </section>

//         {/* Keywords section */}
//         <Box className="mb-6">
//           <Typography variant="h6" className="font-semibold mb-2">
//             Keywords
//           </Typography>

//           <Box className="flex flex-wrap gap-2">{keywordButtons}</Box>
//         </Box>

//         {/* Reset button */}
//         <Button
//           variant="contained"
//           fullWidth
//           className="py-2 mb-6"
//           sx={{
//             backgroundColor: "black",
//             "&:hover": { backgroundColor: "#333" },
//           }}
//           onClick={handleResetFilters}
//         >
//           Reset Filters
//         </Button>
//       </Container>
//     </Box>
//   );
// };

// // Use React.memo to prevent unnecessary re-renders
// export default React.memo(Sidebar);

import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import {
  setKeyword,
  setMaxPrice,
  setMinPrice,
  setSearchQuery,
  setSelectedCategory,
} from "../reducers/FilterSlice";
import {
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Typography, Button } from "@mui/material";
import { RootState } from "../app/store";
import { useLazyGetCategoryListQuery } from "../services/ProductData";
import * as Sentry from "@sentry/react";

const KEYWORDS = ["apple", "watch", "shoes", "shirt"];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { searchQuery, selectedCategory, minPrice, maxPrice } = useSelector(
    (state: RootState) => state.filter
  );

  const [categories, setCategories] = useState<string[]>([]);
  const [fetchCategories] = useLazyGetCategoryListQuery();
  // const { data: categoriesData } = useGetCategoryListQuery();
  // console.log(categoriesData);
  // Log error if present
  // useEffect(() => {
  //   if (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // }, [error]);
  const handleFetchCategories = async () => {
    try {
      // const response = await fetchCategories(undefined, {
      //   signal: controller.signal,
      // }).unwrap();
      const response = await fetchCategories().unwrap();
      // console.log(response);

      // Update the categories state for the sidebar
      // Ensure response is an array
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.warn("Categories response is not an array:", response);
        setCategories([]);
      }
    } catch (error) {
      // if (controller.signal.aborted) {
      //     console.log("Fetch aborted");
      //     return;
      //   }
      // console.log(error);
      if (import.meta.env.MODE !== "development") {
        Sentry.captureException(error);
      } else {
        console.error("Caught error:", error);
      }
      setCategories([]);
    }
  };
  useEffect(() => {
    handleFetchCategories();
    // const controller = new AbortController();

    // handleFetchCategories(controller);
    // return () => {
    //   controller.abort(); // 💣 cancel the fetch if component unmounts
    // };
  }, []);

  // Helper function to get random categories
  const getRandomCategories = (categories: string[], count: number) => {
    if (!categories || categories.length === 0) return [];
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomCategories = useMemo(() => {
    return getRandomCategories(categories, 4);
  }, [categories]);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setMinPrice(value ? parseFloat(value) : undefined));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setMaxPrice(value ? parseFloat(value) : undefined));
  };

  const handleRadioChangeCategories = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleKeywordClick = (keyword: string) => {
    dispatch(setKeyword(keyword));
    dispatch(setSelectedCategory(""));
  };

  const handleResetFilters = () => {
    dispatch(setSearchQuery(""));
    dispatch(setMinPrice(undefined));
    dispatch(setMaxPrice(undefined));
    dispatch(setKeyword(""));
    dispatch(setSelectedCategory(""));
  };

  // const getCategories = async () => {
  //   try {
  //     const data = await fetchCategories().unwrap();
  //     console.log(data);

  //     // setCategories(data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <Box className="h-screen fixed left-0 w-64 bg-white shadow-lg">
      <h1 className="text-3xl pl-5 font-bold mt-4">Search Store</h1>
      <Container>
        <TextField
          className="w-full my-3"
          label="Search Product"
          variant="standard"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />

        <Box className="flex justify-center items-center gap-2 my-3">
          <TextField
            label="Min"
            className="w-full"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
            variant="outlined"
          />
          <TextField
            label="Max"
            className="w-full"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
            variant="outlined"
          />
        </Box>

        <section>
          <Box sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5" className="text-xl font-semibold mb-3">
              Categories
            </Typography>
            {randomCategories.map((category, index) => (
              <div key={index}>
                <FormControl component="fieldset">
                  <RadioGroup name={`radio-button-group-${index}`}>
                    <FormControlLabel
                      control={<Radio />}
                      checked={category === selectedCategory}
                      onChange={() => handleRadioChangeCategories(category)}
                      value={category}
                      label={category.toUpperCase()}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            ))}
          </Box>
        </section>

        <Box className="mb-5">
          <Typography variant="h5" className="text-xl font-semibold mb-3">
            Keywords
          </Typography>
          <Box className="py-2 ">
            {KEYWORDS.map((keyword, index) => (
              <Button
                // sx={{ marginBottom: "3px" }}
                sx={{
                  marginBottom: "3px",
                  borderColor: "gray",
                  color: "black",
                  "&:hover": {
                    borderColor: "gray",
                    backgroundColor: "#f5f5f5", // optional: light background on hover
                  },
                }}
                variant="outlined"
                className="block mb-2 w-full  text-left"
                key={index}
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword.toUpperCase()}
              </Button>
            ))}
          </Box>
          <Button
            sx={{ backgroundColor: "black" }}
            variant="contained"
            className="w-full py-2 bg-black text-white rounded mt-5"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Sidebar;
