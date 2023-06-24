import React, { useState } from "react";
import { styled } from "@mui/system";
import HeaderComponent from "../../components/Header";
import SideBarComponent from "../../components/Sidebar";

const MainContainer = styled("div")({
  display: "flex",
});

const MainContentBox = styled("div")({
  width: "70%",
  padding: "20px",
  margin: "50px auto",
});

const Content = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const MainLayout = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <MainContainer>
      <SideBarComponent
        isSidebarOpen={isSidebarOpen}
        handleSidebarClose={handleSidebarClose}
      />
      <Content>
        <HeaderComponent handleSidebarToggle={handleSidebarToggle} />
        <MainContentBox>{props.children}</MainContentBox>
      </Content>
    </MainContainer>
  );
};

export default MainLayout;
