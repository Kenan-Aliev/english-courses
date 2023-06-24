import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

function StudentInfo({ student }) {
  return (
    <>
      <h2>Общая информация о студенте</h2>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>ФИО</b>
              </TableCell>
              <TableCell>
                {student.surname} {student.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Почта</b>
              </TableCell>
              <TableCell>{student.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Номер телефона</b>
              </TableCell>
              <TableCell>{student.phone_number}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentInfo;
