import React, { useRef, useCallback } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

interface Option {
  text: string;
  path: string;
  icon?: React.ReactNode;
  divider?: boolean;
  badge?: number;
  action?: () => void; // Optional action for logout or other custom actions
}

interface ProfileDropdownProps {
  options: Option[];
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  options = [],
  userName,
  userEmail,
  avatarUrl,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setCloseTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  }, []);

  const handleMenuMouseEnter = useCallback(() => {
    clearCloseTimeout();
  }, [clearCloseTimeout]);

  const handleMenuMouseLeave = useCallback(() => {
    setCloseTimeout();
  }, [setCloseTimeout]);

  const handleMenuItemClick = (path: string) => {
    clearCloseTimeout();
    setAnchorEl(null);
    navigate(path);
  };

  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((w) => w.charAt(0))
      .join("")
      .toUpperCase()
      .slice(1, 3);

  return (
    <Box
      sx={{ display: "inline-block", cursor: "pointer" }}
      onMouseEnter={(e) => {
        clearCloseTimeout();
        setAnchorEl(e.currentTarget);
      }}
      onMouseLeave={handleMenuMouseLeave}
    >
      <IconButton
        size="small"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          // ml: 2,
          transition: "all 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.05)" },
          color: "white",
        }}
      >
        <Badge
          overlap="circular"
          color="error"
          badgeContent={
            options.some((opt) => opt.badge && opt.badge > 0)
              ? options.reduce((acc, opt) => acc + (opt.badge ?? 0), 0)
              : undefined
          }
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              width: 36,
              height: 36,
              bgcolor: "inherit",
              // bgcolor: "primary.main",
              color: "black",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "1px solid",
              borderColor: "black",
              // border: "2px solid",
              // borderColor: open ? "primary.main" : "transparent",
              transition: "border-color 0.2s ease-in-out",
            }}
          >
            {!avatarUrl && getInitials(userName ?? "")}
          </Avatar>
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          onMouseEnter: handleMenuMouseEnter,
          onMouseLeave: handleMenuMouseLeave,
        }}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        disableScrollLock
        PaperProps={{
          elevation: 8,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            mt: 1.5,
            minWidth: 240,
            borderRadius: 2,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
          onMouseEnter: handleMenuMouseEnter,
          onMouseLeave: handleMenuMouseLeave,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* User Info Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} noWrap>
            {userName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {userEmail}
          </Typography>
        </Box>

        {/* Menu Items */}
        {options.flatMap(
          ({ text, path, icon, divider, badge, action }, index) => {
            const isLast = index === options.length - 1;
            const items = [
              <MenuItem
                key={text}
                // onClick={() => handleMenuItemClick(path)}
                onClick={() => {
                  if (action) {
                    action(); // run the logout handler
                  } else {
                    navigate(path); // default navigation
                  }
                  setAnchorEl(null); // close the menu
                }}
                sx={{
                  py: 1,
                  px: 2,
                  "&:hover": { bgcolor: "action.hover" },
                  ...(isLast && {
                    px: 2,
                    py: 1.5,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {badge && badge > 0 ? (
                    <Badge badgeContent={badge} color="error" variant="dot">
                      {icon ?? <AccountCircleIcon fontSize="small" />}
                    </Badge>
                  ) : (
                    icon ?? <AccountCircleIcon fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="body2"
                    color={text === "Logout" ? "error.main" : "text.primary"}
                    fontWeight={500}
                  >
                    {text}
                  </Typography>
                </ListItemText>
              </MenuItem>,
            ];
            // if (divider) {
            //   items.push(<Divider key={text + "-divider"} sx={{ my: 0.5 }} />);
            // }
            if (divider) {
              items.push(<Divider key={text + "-divider"} sx={{ my: 0.5 }} />);
            }

            return items;
          }
        )}
        {/* {options.map(({ text, path, icon, divider, badge }, idx) => (
          <React.Fragment key={text}>
            <MenuItem
              onClick={() => handleMenuItemClick(path)}
              sx={{
                py: 1,
                px: 2,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {badge && badge > 0 ? (
                  <Badge badgeContent={badge} color="error" variant="dot">
                    {icon ?? <AccountCircleIcon fontSize="small" />}
                  </Badge>
                ) : (
                  icon ?? <AccountCircleIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body2"
                  color={text === "Logout" ? "error.main" : "text.primary"}
                  fontWeight={500}
                >
                  {text}
                </Typography>
              </ListItemText>
            </MenuItem>
            {divider && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))} */}
      </Menu>
    </Box>
  );
};

export default ProfileDropdown;
