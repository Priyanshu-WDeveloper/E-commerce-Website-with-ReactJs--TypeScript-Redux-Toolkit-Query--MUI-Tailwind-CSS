import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";
import { LongMenuProps } from "../types/LongMenu";
import { Box } from "@mui/material";
// import { useTimeout } from "../hooks/useTimeout";

const ITEM_HEIGHT = 48;
// type TimeoutId = ReturnType<typeof setTimeout>;

export default function LongMenu({ option }: LongMenuProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const [hoverTimeout, setHoverTimeout] = React.useState<NodeJS.Timeout | null>(
  //   null
  // );
  // const timeout = useTimeout();
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const clearTimeouts = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    // setAnchorEl(e.target.value)
    // timeout.clear();
    clearTimeouts();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    clearTimeouts();
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
    // timeout.set(() => {
    //   setAnchorEl(null);
    // }, 200);
    // setAnchorEl(null);
    // setHoverTimeout(timeout);
  };
  const handleMenuItemClick = (path: string) => {
    // timeout.clear();
    clearTimeouts();
    // handleClose();
    setAnchorEl(null);
    navigate(path);
  };
  React.useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleClose}
      // style={{ display: "inline-block" }}
      sx={{ display: "inline-block" }}
    >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        // onClick={handleClick}
        onMouseEnter={clearTimeouts}
        onMouseLeave={handleClose}
        sx={{ color: "white", ml: "5px" }}
      >
        {/* <MoreVertIcon /> */}
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
          // onMouseEnter: () => {},
          // onMouseEnter: handleMouseEnter,
          // onMouseLeave: handleClose,
          onMouseEnter: clearTimeouts, // Stop closing when mouse enters menu
          onMouseLeave: handleClose, // Start closing when mouse leaves menu
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
            onMouseEnter: clearTimeouts,
            onMouseLeave: handleClose,
          },
        }}
      >
        {option.map((opt) => (
          <MenuItem
            key={opt.text}
            selected={opt.text === "Pyxis"}
            onClick={() => handleMenuItemClick(opt.path)}
          >
            {opt.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import { useNavigate } from "react-router-dom";
// import { LongMenuProps } from "../types/LongMenu";
// import { Box } from "@mui/material";

// const ITEM_HEIGHT = 48;

// export default function LongMenu({ option }: LongMenuProps) {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

//   // Clear any existing timeouts to prevent conflicts
//   const clearTimeoutIfExists = React.useCallback(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
//   }, []);

//   const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
//     // Stop event propagation to prevent conflicts with parent components
//     event.stopPropagation();
//     clearTimeoutIfExists();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     clearTimeoutIfExists();
//     timeoutRef.current = setTimeout(() => {
//       setAnchorEl(null);
//     }, 150); // Slightly reduced timeout for better responsiveness
//   };

//   // Direct close without timeout
//   const handleCloseNow = () => {
//     clearTimeoutIfExists();
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (path: string) => {
//     clearTimeoutIfExists();
//     setAnchorEl(null);
//     navigate(path);
//   };

//   // Ensure no memory leaks by clearing timeout when component unmounts
//   React.useEffect(() => {
//     return () => {
//       clearTimeoutIfExists();
//     };
//   }, [clearTimeoutIfExists]);

//   return (
//     <Box
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleClose}
//       onClick={(e) => e.stopPropagation()}
//       sx={{
//         display: "inline-block",
//         position: "relative", // Establish stacking context
//         zIndex: open ? 1300 : "auto", // Ensure menu appears above other header elements when open
//       }}
//     >
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? "long-menu" : undefined}
//         aria-expanded={open ? "true" : undefined}
//         aria-haspopup="true"
//         onClick={(e) => {
//           e.stopPropagation();
//           open ? handleCloseNow() : handleMouseEnter(e);
//         }}
//         sx={{ color: "white", ml: "5px" }}
//       >
//         <AccountCircleIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           "aria-labelledby": "long-button",
//           onMouseEnter: (e) => {
//             e.stopPropagation();
//             clearTimeoutIfExists();
//           },
//           onMouseLeave: handleClose,
//           onClick: (e) => e.stopPropagation(),
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleCloseNow}
//         slotProps={{
//           paper: {
//             elevation: 8, // Increase elevation for better visibility
//             style: {
//               maxHeight: ITEM_HEIGHT * 4.5,
//               width: "20ch",
//               zIndex: 1400, // Higher z-index to ensure it appears above other elements
//             },
//             onMouseEnter: (e) => {
//               e.stopPropagation();
//               clearTimeoutIfExists();
//             },
//             onMouseLeave: handleClose,
//           },
//         }}
//         disableAutoFocus={true}
//         disableEnforceFocus={true}
//         disablePortal={false}
//         disableScrollLock={false}
//       >
//         {option.map((opt) => (
//           <MenuItem
//             key={opt.text}
//             selected={opt.text === "Pyxis"}
//             onClick={() => handleMenuItemClick(opt.path)}
//           >
//             {opt.text}
//           </MenuItem>
//         ))}
//       </Menu>
//     </Box>
//   );
// }
