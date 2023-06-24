import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ModalComponent from "../../../components/Modal";
import { tokensLight } from "../../../providers/ThemeProvider";
import TabsComponent from "../../../components/Tabs";
import StudentInfo from "../../../components/StudentInfo";
import StudentCourses from "../../../components/StudentCourses";
import MyInput from "../../../components/MyInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { createUser, getUsers } from "../../../store/users/usersActions";
import MainLayout from "../../../layouts/MainLayout";

const StudentListPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const students = useSelector((s) => s.users.users);
  const getStudentsLoading = useSelector((s) => s.users.getUsers.loading);

  const dispatch = useDispatch();

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Имя студента обязательно для заполнения"),
    surname: Yup.string().required(
      "Фамилия студента обязательна для заполнения"
    ),
    email: Yup.string()
      .required("Почта студента обязательна для заполнения")
      .email("Введите правильный формат почты"),
    phone_number: Yup.string().required(
      "Номер теелфона обязателен для заполнения"
    ),
    password: Yup.string().required("Пароль обязателен для заполнения"),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      phone_number: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // resetForm();
    },
  });

  const closeCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(false);
  };

  const createStudent = () => {
    // Логика создания студента
    const newStudent = {
      ...values,
      role: 4,
    };
    dispatch(createUser(newStudent));
    setIsCreateModalOpen(false);
  };

  const openStudentModal = (student) => {
    setCurrentStudent(student);
    setIsInfoModalOpen(true);
  };

  const closeStudentInfoModal = () => {
    setCurrentStudent(null);
    setCurrentTab(0);
    setIsInfoModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const currentStudentComponent = useMemo(() => {
    if (currentTab === 0) {
      return <StudentInfo student={currentStudent} />;
    }
    return <StudentCourses student={currentStudent} />;
  }, [currentTab, currentStudent]);

  useEffect(() => {
    dispatch(getUsers({ role: 4 }));
  }, []);

  if (getStudentsLoading) {
    return <Loader />;
  }
  return (
    <MainLayout>
      <h1>Список студентов</h1>

      <Button variant="contained" color="primary" onClick={openCreateModal}>
        Создать студента
      </Button>

      <ModalComponent
        isModalOpen={isCreateModalOpen}
        handleCloseModal={closeCreateModal}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <h2>Создание студента</h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MyInput
                fullWidth
                label="Имя студента"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <MyInput
                fullWidth
                label="Фамилия"
                name="surname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
                error={touched.surname && Boolean(errors.surname)}
                helperText={touched.surname && errors.surname}
              />
              <MyInput
                fullWidth
                label="Почта"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <MyInput
                fullWidth
                label="Номер телефона"
                name="phone_number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone_number}
                error={touched.phone_number && Boolean(errors.phone_number)}
                helperText={touched.phone_number && errors.phone_number}
              />
              <MyInput
                fullWidth
                label="Пароль"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <CardActions>
                <Button
                  variant="contained"
                  color="success"
                  onClick={createStudent}
                >
                  Создать
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={closeCreateModal}
                >
                  Отмена
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </ModalComponent>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ФИО</b>
              </TableCell>
              <TableCell>
                <b>Почта</b>
              </TableCell>
              <TableCell>
                <b>Номер телефона</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow
                key={index}
                onClick={() => openStudentModal(student)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>
                  {student.surname} {student.name}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent
        isModalOpen={isInfoModalOpen}
        handleCloseModal={closeStudentInfoModal}
      >
        <Card
          sx={{
            width: "60%",
            background: tokensLight.primary[400],
          }}
        >
          <CardContent>
            <TabsComponent
              currentTab={currentTab}
              handleTabChange={handleTabChange}
              tabsContent={["Общая информация", "Курсы"]}
            />
            {currentStudentComponent}
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              onClick={closeStudentInfoModal}
            >
              Закрыть
            </Button>
          </CardActions>
        </Card>
      </ModalComponent>
    </MainLayout>
  );
};

export default StudentListPage;
