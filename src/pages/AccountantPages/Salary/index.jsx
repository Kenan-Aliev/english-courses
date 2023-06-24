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
import {
  createSalary,
  getSalaries,
} from "../../../store/financials/financialsActions";

// Компонент страницы оплаты
function SalaryPage() {
  const [openModal, setModalOpen] = useState(false);

  const [salaryData, setSalaryData] = useState({
    teacher: "",
    month: "",
  });

  const salaries = useSelector((s) => s.financials.salaries);
  const getSalariesLoading = useSelector(
    (s) => s.financials.getSalaries.loading
  );
  const createSalarySuccess = useSelector(
    (s) => s.financials.createSalary.success
  );
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
    dispatch(getSalaries());
  }, []);

  useEffect(() => {
    if (createSalarySuccess) {
      setModalOpen(false);
    }
  }, [createSalarySuccess]);

  if (getSalariesLoading) {
    return <Loader />;
  }

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
            <TableCell>
              <b>Сумма зарплаты</b>
            </TableCell>
            <TableCell>
              <b>Преподаватель</b>
            </TableCell>
            <TableCell>
              <b>Месяц</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaries.map((salary) => (
            <TableRow
              key={salary.id}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <TableCell>{salary.salary_sum} сом</TableCell>
              <TableCell>
                {salary.teacher.surname} {salary.teacher.name}
              </TableCell>
              <TableCell>{salary.month.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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
