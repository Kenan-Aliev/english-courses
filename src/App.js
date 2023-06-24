import LoginPage from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { themeSettings } from "./providers/ThemeProvider";
import { useEffect, useMemo } from "react";
import Main from "./pages/Main";
import EducationalMaterials from "./pages/TeacherPages/EducationalMeterials";
import TeachersListPage from "./pages/AdminPages/Teachers";
import GroupsListPage from "./pages/AdminPages/Groups";
import PaymentPage from "./pages/AdminPages/Payment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./store/auth/authActions";
import Loader from "./components/Loader";
import RequiredAuth from "./providers/PermissionProvider";
import SalaryPage from "./pages/AccountantPages/Salary";

function App() {
  const theme = useMemo(() => createTheme(themeSettings("dark")), ["dark"]);
  const getProfileLoading = useSelector((s) => s.auth.getProfile.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  if (getProfileLoading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/materials"
            element={
              <RequiredAuth roles={["Teacher"]}>
                <EducationalMaterials />
              </RequiredAuth>
            }
          />
          <Route
            path="/teachers"
            element={
              <RequiredAuth roles={["Admin"]}>
                <TeachersListPage />
              </RequiredAuth>
            }
          />
          <Route
            path="/groups"
            element={
              <RequiredAuth roles={["Admin"]}>
                <GroupsListPage />
              </RequiredAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <RequiredAuth roles={["Admin"]}>
                <PaymentPage />
              </RequiredAuth>
            }
          />
          <Route
            path="/salary"
            element={
              <RequiredAuth roles={["Accountant"]}>
                <SalaryPage />
              </RequiredAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme={"colored"}
      />
    </BrowserRouter>
  );
}

export default App;
