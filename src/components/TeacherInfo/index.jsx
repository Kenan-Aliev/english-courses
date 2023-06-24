import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

function TeacherInfo({ teacher }) {
  return (
    <>
      <h2>Общая информация о преподавателе</h2>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>ФИО</b>
              </TableCell>
              <TableCell>
                {teacher.surname} {teacher.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Почта</b>
              </TableCell>
              <TableCell>{teacher.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Номер телефона</b>
              </TableCell>
              <TableCell>{teacher.phone_number}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TeacherInfo;
