import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

function GroupInfo({ group }) {
  return (
    <>
      <h2>Общая информация о группе</h2>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Название группы</b>
              </TableCell>
              <TableCell>{group.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Преподаватель</b>
              </TableCell>
              <TableCell>
                {group.teacher.surname} {group.teacher.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Дни проведения занятий</b>
              </TableCell>
              <TableCell>
                {group.weekdays.map((w) => w.name).join(", ")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Начало урока</b>
              </TableCell>
              <TableCell>{group.start_time}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Конец урока</b>
              </TableCell>
              <TableCell>{group.end_time}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default GroupInfo;
