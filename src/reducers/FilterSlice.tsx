import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  keyword: string;
}

const initialState: FilterState = {
  searchQuery: "",
  selectedCategory: "",
  minPrice: undefined,
  maxPrice: undefined,
  keyword: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    // setSelectedCategory(state, action: PayloadAction<string>) {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number | undefined>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | undefined>) {
      state.maxPrice = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
  setKeyword,
} = filterSlice.actions;

export default filterSlice.reducer;
