import React, { useState, useRef, useCallback } from "react";
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
import {
  Person,
  Analytics,
  Logout,
  Settings,
  ShoppingBag,
  FavoriteBorder,
  Notifications,
} from "@mui/icons-material";

interface ProfileDropdownProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
  onProfileClick?: () => void;
  onAnalyticsClick?: () => void;
  onOrdersClick?: () => void;
  onWishlistClick?: () => void;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  onLogoutClick?: () => void;
  notificationCount?: number;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
}

interface MenuItemData {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  divider?: boolean;
  badge?: number;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  anchorEl,
  setAnchorEl,
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  avatarUrl,
  onProfileClick,
  onAnalyticsClick,
  onOrdersClick,
  onWishlistClick,
  onSettingsClick,
  onNotificationsClick,
  onLogoutClick,
  notificationCount = 0,
}) => {
  //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const open = Boolean(anchorEl);

  const clearCloseTimeout = useCallback((): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setCloseTimeout = useCallback((): void => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  }, []);

  const handleMenuMouseEnter = useCallback((): void => {
    clearCloseTimeout();
  }, [clearCloseTimeout]);

  const handleMenuMouseLeave = useCallback((): void => {
    setCloseTimeout();
  }, [setCloseTimeout]);

  const handleMenuItemClick = useCallback(
    (callback?: () => void): void => {
      clearCloseTimeout();
      setAnchorEl(null);
      callback?.();
    },
    [clearCloseTimeout]
  );

  const menuItems: MenuItemData[] = [
    {
      icon: <Person fontSize="small" />,
      label: "My Profile",
      onClick: onProfileClick,
    },
    {
      icon: <ShoppingBag fontSize="small" />,
      label: "My Orders",
      onClick: onOrdersClick,
    },
    {
      icon: <FavoriteBorder fontSize="small" />,
      label: "Wishlist",
      onClick: onWishlistClick,
    },
    {
      icon: <Notifications fontSize="small" />,
      label: "Notifications",
      onClick: onNotificationsClick,
      badge: notificationCount,
    },
    {
      icon: <Analytics fontSize="small" />,
      label: "Analytics",
      onClick: onAnalyticsClick,
    },
    {
      icon: <Settings fontSize="small" />,
      label: "Settings",
      onClick: onSettingsClick,
      divider: true,
    },
    {
      icon: <Logout fontSize="small" color="error" />,
      label: "Logout",
      onClick: onLogoutClick,
    },
  ];

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <IconButton
        size="small"
        sx={{
          ml: 2,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge
          badgeContent={notificationCount > 0 ? notificationCount : undefined}
          color="error"
          overlap="circular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "2px solid",
              borderColor: open ? "primary.main" : "transparent",
              transition: "border-color 0.2s ease-in-out",
            }}
          >
            {!avatarUrl && getInitials(userName)}
          </Avatar>
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          onMouseEnter: () => setAnchorEl(anchorEl),
          onMouseLeave: () => setAnchorEl(null),
        }}
        // onMouseEnter={handleMenuMouseEnter}
        // onMouseLeave={handleMenuMouseLeave}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        disableScrollLock
        PaperProps={{
          elevation: 8,
          //   onMouseEnter: handleMenuMouseEnter,
          //   onMouseLeave: handleMenuMouseLeave,
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
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <MenuItem
              onClick={() => handleMenuItemClick(item.onClick)}
              sx={{
                py: 1,
                px: 2,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.badge && item.badge > 0 ? (
                  <Badge badgeContent={item.badge} color="error" variant="dot">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body2"
                  color={
                    item.label === "Logout" ? "error.main" : "text.primary"
                  }
                  fontWeight={500}
                >
                  {item.label}
                </Typography>
              </ListItemText>
            </MenuItem>
            {item.divider && <Divider sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </Menu>
    </Box>
  );
};

export default ProfileDropdown;
