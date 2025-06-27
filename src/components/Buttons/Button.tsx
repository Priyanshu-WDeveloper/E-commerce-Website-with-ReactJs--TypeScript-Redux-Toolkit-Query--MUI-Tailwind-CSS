// components/GlassButton.jsx or .tsx
import React from "react";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface GlassButtonProps {
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  activePath?: string;
  [key: string]: unknown;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  to,
  onClick,
  children,
  activePath, // optional manual active path override
  ...rest
}) => {
  const location = useLocation();
  const isActive = activePath
    ? location.pathname === activePath
    : to && location.pathname === to;

  return (
    <Button
      component={to ? Link : "button"}
      to={to}
      onClick={onClick}
      sx={{
        // color: "white",
        color: "black",
        fontWeight: 600,
        textTransform: "none",
        fontSize: "1rem",
        padding: "6px 16px",
        borderRadius: "25px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transform: "translateY(-2px)",
        },
        ...(isActive && {
          background: "black",
          color: "white",
          // background: "rgba(218, 165, 32, 0.2)",
          // border: "1px solid goldenrod",
          // color: "goldenrod",
        }),
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default GlassButton;
