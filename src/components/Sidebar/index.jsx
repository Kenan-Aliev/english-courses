import React, { useMemo } from "react";
import { styled } from "@mui/system";
import {
  Toolbar,
  ListItemButton,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { tokensLight } from "../../providers/ThemeProvider";
import { links } from "../../data/sidebarLinks";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const Sidebar = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: tokensLight.primary[400],
  },
}));
const SidebarNav = styled(List)({
  marginTop: "20px",
});

const StyledLink = styled(NavLink)(({ isActive }) => ({
  textDecoration: "none",
  color: "white",
  "&.active": {
    color: "orange",
  },
}));

function SideBarComponent({ isSidebarOpen, handleSidebarClose }) {
  const user = useSelector((s) => s.auth.user);
  // const user = { role: { name: "Student" } };
  const sidebarLinks = useMemo(() => {
    if (Object.keys(user).length > 0) {
      return links.filter((link) => link.role === user.role.name);
    }
    return [];
  }, [user]);
  return (
    <Sidebar
      variant="persistent"
      open={isSidebarOpen}
      onClose={handleSidebarClose}
    >
      <Toolbar />
      <SidebarNav>
        {sidebarLinks.map((link) => {
          return (
            <StyledLink to={link.href} activeClassName="active">
              <ListItemButton>
                <ListItemIcon sx={{ fontSize: "20px" }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </StyledLink>
          );
        })}
      </SidebarNav>
    </Sidebar>
  );
}

export default SideBarComponent;
