import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const RadioButtonGroup: React.FC = () => {
  // Initialize categories as an empty array, can be populated dynamically
  const [categories, setCategories] = useState<string[]>([
    "Category 1",
    "Category 2",
    "Category 3",
  ]);

  // State to keep track of selected category values (one value per category)
  const [selectedCategory, setSelectedCategory] = useState<{
    [key: string]: string;
  }>({});

  // Handle radio button selection for each category
  const handleRadioChangeCategories = (
    category: string,
    value: string
  ): void => {
    setSelectedCategory((prevState) => ({
      ...prevState,
      [category]: value, // Update the selected value for that category
    }));
  };

  return (
    <div>
      {categories.map((category, index) => (
        <FormControl key={index} component="fieldset">
          <FormLabel component="legend">{category.toUpperCase()}</FormLabel>
          <RadioGroup
            name={`radio-button-group-${index}`} // Unique name for each group
            value={selectedCategory[category] || ""} // Controlled value based on selectedCategory state
            onChange={(e) =>
              handleRadioChangeCategories(category, e.target.value)
            } // Update state on selection change
          >
            <FormControlLabel
              control={<Radio />}
              value="Option 1" // Example value for radio button
              label="Option 1"
            />
            <FormControlLabel
              control={<Radio />}
              value="Option 2" // Example value for radio button
              label="Option 2"
            />
          </RadioGroup>
        </FormControl>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
