import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControlLabel,
  Checkbox,
  CardActions,
  Button,
} from "@mui/material";
import { tokensLight } from "../../providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { getGroupStudents } from "../../store/groups/groupsActions";
import { createAttendance } from "../../store/attendance/attendanceActions";

function CreateAttendance({ group }) {
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const students = useSelector((s) => s.groups.groupStudents);
  const dispatch = useDispatch();

  const handleAttendance = () => {
    const attendanceData = {
      group_id: group.id,
      attendance_data: studentsAttendance.map((a) => ({
        student_id: a.student_id,
        is_present: a.is_present,
      })),
    };
    dispatch(createAttendance(attendanceData));
  };

  const handleSelectStudent = (e, studentId) => {
    setStudentsAttendance(
      studentsAttendance.map((st) => {
        return st.student_id === studentId
          ? { ...st, is_present: e.target.checked }
          : st;
      })
    );
  };
  useEffect(() => {
    setStudentsAttendance(
      students.map((st) => ({
        student_id: st.id,
        name: st.surname + " " + st.name,
        is_present: false,
      }))
    );
  }, [students]);
  console.log(studentsAttendance);

  useEffect(() => {
    dispatch(getGroupStudents(group.id));
  }, []);
  return (
    <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
      <CardContent>
        <Typography variant="h3" component="h2" mb="20px">
          Отметить посещаемость
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ученик</TableCell>
                <TableCell>Присутствовал ли</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsAttendance.map((student) => (
                <TableRow key={student.student_id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={student.is_present}
                          onChange={(e) =>
                            handleSelectStudent(e, student.student_id)
                          }
                          color="success"
                        />
                      }
                      label="Присутствовал"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CardActions>
          <Button
            onClick={handleAttendance}
            variant="contained"
            color="success"
          >
            Сохранить
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default CreateAttendance;
