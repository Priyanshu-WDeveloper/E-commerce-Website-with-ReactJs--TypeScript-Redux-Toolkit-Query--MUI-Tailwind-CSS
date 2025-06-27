import React, { useRef, useState, useEffect } from "react";
import ProfileDropdown from "./LongMenu2";
import { useIsMobile } from "../hooks/useIsMobile";

const HoverProfileWrapper: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setAnchorEl(e.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setAnchorEl(null);
      }, 150);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      setAnchorEl(anchorEl ? null : e.currentTarget);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      <ProfileDropdown
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        // handleMouseEnter={handleMouseEnter}
        // handleMouseLeave={handleMouseLeave}
        // containerRef={containerRef}
        userName="John Doe"
        userEmail="john@example.com"
        avatarUrl="/avatar.jpg"
        notificationCount={3}
        onProfileClick={() => console.log("Go to Profile")}
        onOrdersClick={() => console.log("Go to Orders")}
        onWishlistClick={() => console.log("Go to Wishlist")}
        onAnalyticsClick={() => console.log("Go to Analytics")}
        onSettingsClick={() => console.log("Settings")}
        onNotificationsClick={() => console.log("Notifications")}
        onLogoutClick={() => console.log("Logout")}
      />
    </div>
  );
};

export default HoverProfileWrapper;
