import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "./app/store";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import {
  setKeyword,
  setMaxPrice,
  setMinPrice,
  setSearchQurey,
  setSelectedCategory,
} from "../reducers/FilterSlice";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Typography, Button } from "@mui/material";
import { RootState } from "../app/store";
import {
  useGetCategoryListQuery,
  useGetProductDataByCategoryQuery,
  useLazyGetCategoryListQuery,
  useLazyGetProductDataByCategoryQuery,
} from "../services/api/ApiSlice";

interface Product {
  category: string;
  title: string;
}
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useSelector((state: RootState) => state.filter);

  const [categories, setCategories] = useState([]);
  // const { data, isLoading } = useGetProductDataByCategoryQuery(
  //   selectedCategory || ""
  // );
  // const [cattegory] = useLazyGetProductDataByCategoryQuery();
  const [categoryData] = useLazyGetCategoryListQuery();
  // const {
  //   data: categoryData = [],
  //   isLoading: loaad,
  //   isError,
  // } = useGetCategoryListQuery();
  // if (loaad) return <p>Loading categories...</p>;
  // if (isError) return <p>Error fetching categories.</p>;
  // console.log(categories, "categories");

  // const [selectedCategory, setSelectedCategory] = useState<{ [key: string]: string }>({});
  const getRandomCategories = (categories: string, count: number) => {
    const arr = [...categories];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, count);
  };
  const randomCategories = useMemo(() => {
    return getRandomCategories(categories, 4);
  }, [categories]);
  const [keywords, setKeywords] = useState([
    "apple",
    "watch",
    // "Fashion",
    // "trend",
    "shoes",
    "shirt",
  ]);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value;
    // const numericValue = value === '' ? undefined : parseFloat(value)
    // setMinPrice(numericValue)
    const value = e.target.value;
    dispatch(setMinPrice(value ? parseFloat(value) : undefined));
  };
  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setMaxPrice(value ? parseFloat(value) : undefined));
  };
  const handleRadioChangeCategories = (category: string) => {
    // const handleRadioChangeCategories = (category: string, value: string): void => {
    dispatch(setSelectedCategory(category));
    // setSelectedCategory((prevState) => ({
    //     ...prevState,                               // it works with the setSelected category usestate
    //     [category]: value
    // }))
  };
  const handleKeywordClick = (keyword: string) => {
    dispatch(setKeyword(keyword));
    dispatch(setSelectedCategory(""));
    console.log(keyword);
  };
  const handleResetFilters = () => {
    dispatch(setSearchQurey(""));
    dispatch(setSearchQurey(""));
    dispatch(setMinPrice(undefined));
    dispatch(setMaxPrice(undefined));
    dispatch(setKeyword(""));
  };
  const getCategories = async () => {
    const data = await categoryData().unwrap();
    console.log("categoryData", data);
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  // useEffect(() => {
  //   if (!isLoading && data) {
  //     getCategories(selectedCategory);
  //   }
  // }, [isLoading, data, selectedCategory]);
  // useEffect(() => {
  //   try {
  //     (async () => {
  //       const response = await axios.get<FetchResponse>(
  //         "https://dummyjson.com/products"
  //       ); //? if there is (products/) it will show object in console.log
  //       // console.log(response.data);
  //       const data = response.data;
  //       console.log(response.data);
  //       // console.log(categoryData);

  //       // const data = await cattegory("furniture").unwrap();
  //       console.log(data);

  //       const uniqueCategory = [
  //         ...new Set(data.products.map((product) => product.category)),
  //       ];
  //       setCategories(uniqueCategory);
  //     })();
  //   } catch (error) {
  //     console.error(`Error Fetching Products`, error);
  //   }
  // }, []);

  return (
    <>
      <Box
        // sx={{ position: 'fixed', padding: '10px' }}
        // className="w-64 p-5 h-screen"
        className=" h-screen fixed left-0 w-64"
      >
        <h1 className="text-3xl pl-2.5 font-bold  mt-4">Search Store</h1>
        <Container>
          <TextField
            className="border-2 rounded px-2 py-3 w-full sm:mb-0"
            label="Serach Product"
            variant="standard"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQurey(e.target.value))}
          />
          <Box className="flex justify-center mt-3 items-center gap-2">
            <TextField
              id="outlined-basic"
              label="Min"
              className="border-2 mr-2  w-full"
              value={minPrice ?? ""}
              onChange={handleMinPriceChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Max"
              className="border-2 mt-1.5  mr-2  w-full"
              // sx={"border-2 mr-2 px-5 py-3 mb-3 w-full "}

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
              {/* {categories.slice(0, 4).map((category, index) => ( */}
              {randomCategories.map((category, index) => (
                <>
                  <div key={index}>
                    <FormControl component="fieldset">
                      {/* <FormLabel component='legend'>{category.toUpperCase()}</FormLabel> */}
                      <RadioGroup
                        name={`radio-button-group-${index}`}
                        // value={category}
                      >
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
                </>
              ))}
            </Box>
          </section>
          <Box className="mb-5">
            <Typography
              variant="h5"
              className="text-xl font-semibold mb-3"
              sx={{ marginBottom: "10px" }}
            >
              Keywords
            </Typography>
            <Box>
              {keywords.map((keyword, index) => (
                <Button
                  variant="outlined"
                  sx={{ marginBottom: "6px" }}
                  className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 "
                  key={index}
                  onClick={() => handleKeywordClick(keyword)}
                >
                  {keyword.toUpperCase()}
                </Button>
              ))}
            </Box>
            <Button
              variant="contained"
              sx={{ marginTop: "2px", backgroundColor: "black" }}
              className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 "
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Sidebar;
