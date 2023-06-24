import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { tokensLight } from "../../../providers/ThemeProvider";
import ModalComponent from "../../../components/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import MyInput from "../../../components/MyInput";
import MainLayout from "../../../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelLesson,
  createHomework,
  getTeacherGroupsByWeekDay,
} from "../../../store/groups/groupsActions";
import { weekdays } from "../../../data/weekdays";
import Loader from "../../../components/Loader";
import CreateAttendance from "../../../components/CreateAttendance";

const TeacherPage = () => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [homeworkModalOpen, setHomeworkModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const user = useSelector((s) => s.auth.user);
  const teacherGroups = useSelector((s) => s.groups.groups);
  const getTeacherGroupsLoading = useSelector(
    (s) => s.groups.getTeacherGroupsByWeekDay.loading
  );
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    task: Yup.string().required("Заголовок обязателен"),
    description: Yup.string().required("Описание обязательно"),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      task: "",
      description: "",
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append("task", values.task);
      formdata.append("description", values.description);
      formdata.append("file", values.file);
      formdata.append("group_id", selectedGroup.id);
      dispatch(createHomework(formdata));
      closeHomeworkModal();
    },
  });

  // Методы для открытия и закрытия модалок
  const openCancelModal = () => setCancelModalOpen(true);
  const closeCancelModal = () => setCancelModalOpen(false);

  const openHomeworkModal = () => setHomeworkModalOpen(true);
  const closeHomeworkModal = () => {
    setHomeworkModalOpen(false);
    resetForm();
  };

  const openAttendanceModal = () => setAttendanceModalOpen(true);

  const closeAttendanceModal = () => {
    setAttendanceModalOpen(false);
  };

  // Обработчики событий
  const handleCancelLesson = () => {
    // Логика отмены занятия
    dispatch(cancelLesson(selectedGroup.id));
    closeCancelModal();
  };

  const handleSetHomework = () => {
    // Логика задания домашнего задания
    closeHomeworkModal();
  };

  useEffect(() => {
    const currentDate = new Date();
    const weekday = weekdays.find((w) => w.id === currentDate.getDay());
    dispatch(
      getTeacherGroupsByWeekDay({
        teacher_id: user.id,
        weekday: weekday.name,
      })
    );
  }, []);

  if (getTeacherGroupsLoading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <Typography variant="h2" component="h1" align="left" gutterBottom>
        Мои занятия на сегодня
      </Typography>
      {teacherGroups.length === 0 ? (
        <Typography component={"h1"} variant="h3">
          Уроков на сегодня нет
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название группы</TableCell>
                <TableCell>Преподаватель</TableCell>
                <TableCell>Дни занятий</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teacherGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>
                    {group.teacher?.surname} {group.teacher?.name}
                  </TableCell>
                  <TableCell>
                    {group.weekdays.map((w) => w.name).join(", ")}
                  </TableCell>
                  <TableCell sx={{ display: "flex", columnGap: "10px" }}>
                    <Button
                      onClick={() => {
                        openCancelModal();
                        setSelectedGroup(group);
                      }}
                      variant="contained"
                      color="error"
                    >
                      Отменить
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedGroup(group);
                        openHomeworkModal();
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Задать домашнее задание
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedGroup(group);
                        openAttendanceModal();
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Отметить посещаемость
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Модалка для подтверждения отмены занятия */}
      <ModalComponent
        isModalOpen={cancelModalOpen}
        handleCloseModal={closeCancelModal}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <Typography variant="h5" component="h2" mb="20px">
              Вы действительно хотите отменить занятие?
            </Typography>
            <CardActions>
              <Button
                onClick={handleCancelLesson}
                variant="contained"
                color="success"
              >
                Да
              </Button>
              <Button
                onClick={closeCancelModal}
                variant="outlined"
                color="error"
              >
                Отмена
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </ModalComponent>

      {/* Форма для задания домашнего задания */}
      <ModalComponent
        isModalOpen={homeworkModalOpen}
        handleCloseModal={closeHomeworkModal}
      >
        <Card
          sx={{
            width: "50%",
            background: tokensLight.primary[400],
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" mb="20px">
              Задать домашнее задание
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <MyInput
                label="Заголовок"
                fullWidth
                name="task"
                value={values.task}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.task && Boolean(errors.task)}
                helperText={touched.task && errors.task}
              />
              <MyInput
                label="Описание"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <TextField
                type="file"
                inputProps={{ multiple: false }}
                onChange={(e) => setFieldValue("file", e.target.files[0])}
              />
              <CardActions>
                <Button type="submit" variant="contained" color="success">
                  Задать
                </Button>
                <Button
                  onClick={closeHomeworkModal}
                  variant="outlined"
                  color="error"
                >
                  Отмена
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </ModalComponent>

      {/* Модалка для отметки посещаемости */}
      <ModalComponent
        isModalOpen={attendanceModalOpen}
        handleCloseModal={closeAttendanceModal}
      >
        <CreateAttendance group={selectedGroup} />
      </ModalComponent>
    </MainLayout>
  );
};

export default TeacherPage;
