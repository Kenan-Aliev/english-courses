import React from "react";
import { Tabs, Tab } from "@mui/material";
import { styled } from "@mui/system";

const StyledTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    color: "red",
  },
}));

function TabsComponent({ currentTab, handleTabChange, tabsContent }) {
  return (
    <Tabs value={currentTab} onChange={handleTabChange}>
      {tabsContent.map((tab) => {
        return <StyledTab label={tab} />;
      })}
    </Tabs>
  );
}

export default TabsComponent;
