import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Stack,
  CardContent,
  Typography,
} from "@mui/material";
import MainLayout from "../../../layouts/MainLayout";
import ModalComponent from "../../../components/Modal";
import { tokensLight } from "../../../providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { getUsers } from "../../../store/users/usersActions";
import MySelect from "../../../components/MySelect";
import { months } from "../../../data/months";
import { createSalary } from "../../../store/financials/financialsActions";

// Компонент страницы оплаты
function SalaryPage() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [openModal, setModalOpen] = useState(false);

  const [salaryData, setSalaryData] = useState({
    teacher: "",
    month: "",
  });

  const teachers = useSelector((s) => s.users.users).map((t) => ({
    text: t.surname + " " + t.name,
    value: t.id,
  }));
  const dispatch = useDispatch();

  const handleChangeSalaryData = (e) => {
    setSalaryData({ ...salaryData, [e.target.name]: e.target.value });
  };

  const handleSubmitSalary = (e) => {
    e.preventDefault();
    dispatch(createSalary(salaryData));
  };
  useEffect(() => {
    dispatch(getUsers({ role: 2 }));
  }, []);

  return (
    <MainLayout>
      <h1>Зарплаты</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Начислить зарплату
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название группы</TableCell>
            <TableCell>Стоимость курса</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {groups.map((course) => (
            <TableRow
              key={course.id}
              onClick={() => {
                setActiveCourse(course);
                setModalOpen(true);
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.price}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>

      <ModalComponent
        isModalOpen={openModal}
        handleCloseModal={() => setModalOpen(false)}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <Stack
              spacing={2}
              component={"form"}
              onSubmit={handleSubmitSalary}
              width={"70%"}
            >
              <Typography component={"h1"} variant="h2">
                Начислить зарплату
              </Typography>
              <MySelect
                items={teachers}
                handleChange={handleChangeSalaryData}
                label={"Выберите учителя"}
                value={salaryData.teacher}
                name={"teacher"}
              />
              <MySelect
                items={months.map((m) => ({ text: m.name, value: m.id }))}
                handleChange={handleChangeSalaryData}
                label={"Выберите месяц"}
                value={salaryData.month}
                name={"month"}
              />
              <Button color="success" variant="contained" type="submit">
                Начислить зарплату
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </ModalComponent>
    </MainLayout>
  );
}

export default SalaryPage;
