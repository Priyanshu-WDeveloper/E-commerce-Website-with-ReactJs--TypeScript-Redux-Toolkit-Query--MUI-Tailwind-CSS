import { Button, ButtonProps } from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";

interface AddMinusButtonProps extends ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const AddMinusButton: React.FC<AddMinusButtonProps> = ({
  onClick,
  children,
  sx,
  ...rest
}) => {
  return (
    <Button
      sx={{
        width: "24px",
        height: "24px",
        minWidth: "1px",
        bgcolor: "black",
        color: "white",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
          boxShadow: 5,
        },
        ...sx,
      }}
      className="bg-gray-200  rounded-full w-2 h-6 text-cyan-600"
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AddMinusButton;
