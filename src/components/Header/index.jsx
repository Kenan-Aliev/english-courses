import React, { useState } from "react";
import { styled } from "@mui/system";
import { AppBar, Toolbar, IconButton, MenuItem, Menu } from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { tokensLight } from "../../providers/ThemeProvider";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";

const Header = styled(AppBar)({
  zIndex: 10000,
  backgroundColor: tokensLight.primary[500],
});

const ToolbarContent = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const LogoIcon = styled(Link)({
  display: "flex",
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 35,
  width: "fit-content",
  color: "white",
  transition: "color 0.3s", // добавляем плавный переход для изменения цвета
  "&:hover": {
    color: "red", // изменяем цвет при наведении
  },
  "&:active": {
    color: "blue", // изменяем цвет при клике
  },
});

const HeaderComponent = ({ handleSidebarToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <Header position="fixed">
      <ToolbarContent>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleSidebarToggle}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <LogoIcon to="/">
          <FaBook />
        </LogoIcon>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              style: {
                backgroundColor: tokensLight.primary[500], // Задний фон меню
              },
            }}
            sx={{
              zIndex: "11111",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Выйти</MenuItem>
          </Menu>
        </div>
      </ToolbarContent>
    </Header>
  );
};

export default HeaderComponent;
