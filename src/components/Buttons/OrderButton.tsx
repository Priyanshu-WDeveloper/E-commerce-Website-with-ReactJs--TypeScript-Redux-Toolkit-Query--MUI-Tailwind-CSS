import { Button, ButtonProps } from "@mui/material";
import React, { ReactNode, MouseEventHandler } from "react";

interface OrderButtonProps extends ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  onClick,
  children,
  sx,
  ...rest
}) => {
  return (
    // <Button
    //   onClick={onClick}
    //   //   className="bg-black rounded-2xl"
    //   sx={{
    //     backgroundColor: "black",
    //     width: "90px",
    //     fontSize: "11px",
    //     height: "30px",
    //     fontWeight: "1000",
    //     // mb: "10px",
    //     ":hover": {
    //       backgroundColor: "black",
    //       color: "white",
    //     },

    //     color: "white",
    //     ...sx,
    //   }}
    //   // color="primary"
    //   variant="text"
    //   {...rest}
    // >
    //   {children}
    // </Button>
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "black",
        color: "white",
        width: "250px",
        // display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        fontWeight: 800,
        padding: "10px",
        ":hover": {
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default OrderButton;
