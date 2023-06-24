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
import MyInput from "../../../components/MyInput";
import MainLayout from "../../../layouts/MainLayout";
import TeacherInfo from "../../../components/TeacherInfo";
import TeacherCourses from "../../../components/TeacherCourses";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { createUser, getUsers } from "../../../store/users/usersActions";

const TeachersListPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const teachers = useSelector((s) => s.users.users);
  const getTeachersLoading = useSelector((s) => s.users.getUsers.loading);

  const dispatch = useDispatch();

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

  const { values, handleChange, handleBlur, resetForm, errors, touched } =
    useFormik({
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

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    resetForm();
  };

  const createTeacher = () => {
    // Логика создания препода
    const newTeacher = {
      ...values,
      role: 2,
    };
    dispatch(createUser(newTeacher));
    resetForm();
    setIsCreateModalOpen(false);
  };

  const openTeacherModal = (teacher) => {
    setCurrentTeacher(teacher);
    setIsInfoModalOpen(true);
  };

  const closeTeacherInfoModal = () => {
    setCurrentTeacher(null);
    setCurrentTab(0);
    setIsInfoModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const currentTeacherComponent = useMemo(() => {
    if (currentTab === 0) {
      return <TeacherInfo teacher={currentTeacher} />;
    }
    return <TeacherCourses teacher={currentTeacher} />;
  }, [currentTab, currentTeacher]);

  useEffect(() => {
    dispatch(getUsers({ role: 2 }));
  }, []);

  if (getTeachersLoading) {
    return <Loader />;
  }
  return (
    <MainLayout>
      <h1>Список преподавателей</h1>

      <Button variant="contained" color="primary" onClick={openCreateModal}>
        Создать преподавателя
      </Button>

      <ModalComponent
        isModalOpen={isCreateModalOpen}
        handleCloseModal={closeCreateModal}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <h2>Создание преподавателя</h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MyInput
                fullWidth
                label="Имя преподавателя"
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
                  onClick={createTeacher}
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
            {teachers.map((teacher, index) => (
              <TableRow
                key={index}
                onClick={() => openTeacherModal(teacher)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>
                  {teacher.surname} {teacher.name}
                </TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent
        isModalOpen={isInfoModalOpen}
        handleCloseModal={closeTeacherInfoModal}
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
            {currentTeacherComponent}
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              onClick={closeTeacherInfoModal}
            >
              Закрыть
            </Button>
          </CardActions>
        </Card>
      </ModalComponent>
    </MainLayout>
  );
};

export default TeachersListPage;
