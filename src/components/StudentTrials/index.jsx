import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  Card,
} from "@mui/material";
import ModalComponent from "../Modal";
import { tokensLight } from "../../providers/ThemeProvider";

function StudentTrials({ student }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Пример данных для списка групп
  const groups = [
    { name: "Группа 1", studentsCount: 10 },
    { name: "Группа 2", studentsCount: 15 },
    { name: "Группа 3", studentsCount: 8 },
  ];

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <h2>Пробные уроки студента</h2>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Button variant="contained" color="info" onClick={openModal}>
            Записать на пробный урок
          </Button>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название курса</TableCell>
              <TableCell>Количество человек</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.studentsCount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => console.log("Записать в группу")}
                  >
                    Записать в группу
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent isModalOpen={isModalOpen} handleCloseModal={closeModal}>
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название группы</TableCell>
                  <TableCell>Количество людей</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group, index) => (
                  <TableRow key={index}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.studentsCount}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => console.log("Записаться в группу")}
                      >
                        Записать на пробный урок
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </ModalComponent>
    </>
  );
}

export default StudentTrials;
