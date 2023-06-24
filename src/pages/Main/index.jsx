import React from "react";
import TeacherPage from "../TeacherPages/Main";
import MainLayout from "../../layouts/MainLayout";
import StudentListPage from "../AdminPages/Main";
import StudentPage from "../StudentPages/Main";
import { useSelector } from "react-redux";
import RequiredAuth from "../../providers/PermissionProvider";
import PaymentPage from "../AccountantPages/Main";

function Main() {
  const user = useSelector((s) => s.auth.user);
  // const user = { role: { name: "Student" } };
  if (Object.keys(user).length > 0 && user.role.name === "Admin") {
    return <StudentListPage />;
  } else if (Object.keys(user).length > 0 && user.role.name === "Student") {
    return <StudentPage />;
  } else if (Object.keys(user).length > 0 && user.role.name === "Teacher") {
    return <TeacherPage />;
  }
  return (
    <RequiredAuth roles={["Accountant"]}>
      <PaymentPage />
    </RequiredAuth>
  );
}

export default Main;
