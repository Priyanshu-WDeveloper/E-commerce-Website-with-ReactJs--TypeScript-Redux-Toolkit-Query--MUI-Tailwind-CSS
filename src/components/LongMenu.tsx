import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { LongMenuProps } from "../types/LongMenu";

const ITEM_HEIGHT = 48;

export default function LongMenu({ option }: LongMenuProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (path: string) => {
    handleClose();
    navigate(path);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
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
      </>
    </div>
  );
}
