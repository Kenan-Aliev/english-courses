import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";
import MainLayout from "../../../layouts/MainLayout";
import ModalComponent from "../../../components/Modal";
import { tokensLight } from "../../../providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupHomeworks,
  getGroupMaterials,
  getGroups,
} from "../../../store/groups/groupsActions";

// Компонент страницы студентов
function StudentPage() {
  const [openModal, setModalOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);

  const user = useSelector((s) => s.auth.user);
  const studentCourses = useSelector((s) => s.groups.groups);
  const groupHomeworks = useSelector((s) => s.groups.groupHomeworks);
  const groupMaterials = useSelector((s) => s.groups.groupMaterials);

  const dispatch = useDispatch();

  const handleOpenModal = (course) => {
    setActiveCourse(course);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (openModal && activeCourse) {
      dispatch(getGroupHomeworks({ group_id: activeCourse.id }));
      dispatch(getGroupMaterials({ group_id: activeCourse.id }));
    }
  }, [openModal, activeCourse]);

  useEffect(() => {
    dispatch(getGroups({ student: user.id }));
  }, []);

  return (
    <MainLayout>
      <h1>Мои курсы</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название курса</TableCell>
            <TableCell>Домашние задания и учебные материалы</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(course)}
                >
                  Домашние задания и учебные материалы
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalComponent
        isModalOpen={openModal}
        handleCloseModal={handleCloseModal}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <h2>Учебные материалы</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Файл</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>
                      <a href={material.file} download target="_blank">
                        Открыть
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h2>Домашние задания</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Описание</TableCell>
                  <TableCell>Файл</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupHomeworks.map((homework) => (
                  <TableRow key={homework.id}>
                    <TableCell>{homework.task}</TableCell>
                    <TableCell>{homework.description}</TableCell>
                    <TableCell>
                      <a href={homework.file} download target="_blank">
                        Открыть
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ModalComponent>
    </MainLayout>
  );
}

export default StudentPage;
