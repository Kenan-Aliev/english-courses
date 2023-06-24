import React, { useEffect, useState } from "react";
import {
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import ModalComponent from "../Modal";
import { getUsers } from "../../store/users/usersActions";
import { useDispatch, useSelector } from "react-redux";
import { tokensLight } from "../../providers/ThemeProvider";
import MySelect from "../MySelect";
import {
  addStudentsToGroup,
  getGroupStudents,
} from "../../store/groups/groupsActions";

// Данные для таблицы студентов
const studentData = [
  { id: 1, name: "Иван Иванов" },
  { id: 2, name: "Петр Петров" },
  { id: 3, name: "Анна Сидорова" },
  // ... добавьте остальные студенты
];

const GroupStudents = ({ group }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const students = useSelector((s) => s.users.users).map((st) => ({
    text: st.surname + " " + st.name,
    value: st.id,
  }));
  const groupStudents = useSelector((s) => s.groups.groupStudents);
  const addStudentsToGroupSuccess = useSelector(
    (s) => s.groups.addStudentsToGroup.success
  );
  const dispatch = useDispatch();

  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStudentsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStudents(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleAddStudentsToGroup = () => {
    const studs = students
      .filter((s) => selectedStudents.includes(s.text))
      .map((s) => s.value);
    const req = {
      groupId: group.id,
      students: studs,
    };
    dispatch(addStudentsToGroup(req));
  };

  useEffect(() => {
    if (addStudentsToGroup) {
      setIsModalOpen(false);
    }
  }, [addStudentsToGroupSuccess]);

  useEffect(() => {
    dispatch(getGroupStudents(group.id));
    dispatch(getUsers({ role: 4 }));
  }, []);

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={openModal}>
        Добавить студента
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>ФИО</b>
            </TableCell>
            <TableCell>
              <b>Номер телефона</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>
                {student.surname} {student.name}
              </TableCell>
              <TableCell>{student.phone_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalComponent isModalOpen={isModalOpen} handleCloseModal={closeModal}>
        <Card
          sx={{
            width: "60%",
            background: tokensLight.primary[500],
          }}
        >
          <CardContent
            sx={{
              width: "60%",
            }}
          >
            <Stack spacing={2}>
              <Typography component={"h1"} variant="h2">
                Запись студента в группу
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label">
                  Выберите студентов
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  multiple
                  name="students_ids"
                  value={selectedStudents}
                  input={<OutlinedInput label="Выберите студентов" />}
                  onChange={handleStudentsChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {students.map((option) => (
                    <MenuItem key={option.value} value={option.text}>
                      {option.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                color="primary"
                variant="contained"
                disabled={selectedStudents.length === 0}
                onClick={handleAddStudentsToGroup}
              >
                Сохранить
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </ModalComponent>
    </div>
  );
};

export default GroupStudents;
