import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/groups/groupsActions";

function TeacherCourses({ teacher }) {
  const groups = useSelector((s) => s.groups.groups);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups({ teacher: teacher.id }));
  }, []);
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <h2>Курсы преподавателя</h2>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название курса</TableCell>
              <TableCell>Дни занятий</TableCell>
              <TableCell>Стоимость курса</TableCell>
              <TableCell>Начало урока</TableCell>
              <TableCell>Конец урока</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group, index) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  {group.weekdays.map((w) => w.name).join(", ")}
                </TableCell>
                <TableCell>{group.price} сом</TableCell>
                <TableCell>{group.start_time}</TableCell>
                <TableCell>{group.end_time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TeacherCourses;
