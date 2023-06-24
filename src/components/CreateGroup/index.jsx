import React, { useState, useEffect } from "react";
import {
  CardActions,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import MySelect from "../MySelect";
import MyInput from "../MyInput";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users/usersActions";
import { getWeekdays } from "../../store/weekdays/weekDaysActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createGroup } from "../../store/groups/groupsActions";

const time = [
  {
    text: "09:00",
    value: "09:00",
  },
  {
    text: "10:00",
    value: "10:00",
  },
  {
    text: "11:00",
    value: "11:00",
  },
  {
    text: "12:00",
    value: "12:00",
  },
  {
    text: "13:00",
    value: "13:00",
  },
  {
    text: "14:00",
    value: "14:00",
  },
  {
    text: "15:00",
    value: "15:00",
  },
  {
    text: "16:00",
    value: "16:00",
  },
  {
    text: "17:00",
    value: "17:00",
  },
  {
    text: "18:00",
    value: "18:00",
  },
];

// Компонент создания группы с выбором учителя и дат проведения уроков
function GroupCreation() {
  const teachers = useSelector((s) => s.users.users).map((t) => ({
    text: t.surname + " " + t.name,
    value: t.id,
  }));

  const weekdays = useSelector((s) => s.weekdays.weekdays).map((w) => ({
    text: w.name,
    value: w.id,
  }));
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Введите название"),
    teacher: Yup.string().required("Выберите учителя"),
    price: Yup.number()
      .required("Обязательное поле")
      .moreThan(0, "Цена должна быть больше нуля"),
    // classroom: Yup.string().required("Выберите кабинет"),
    weekdays: Yup.array().min(2, "Выберите хотя бы 2 дня недели"),
    start_time: Yup.string().required("Выберите время начала урока"),
    end_time: Yup.string().required("Выберите время конца урока"),
  });

  const { errors, handleChange, handleBlur, values, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        teacher: "",
        price: 0,
        // classroom: "",
        weekdays: [],
        start_time: "",
        end_time: "",
      },
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        if (values.start_time.split(":")[0] > values.end_time.split(":")[0]) {
          toast.error(
            "Время начала урока должно быть меньше времени конца урока"
          );
        } else {
          const reqWeekDays = weekdays
            .filter((w) => values.weekdays.includes(w.text))
            .map((w) => w.value);
          const req = {
            ...values,
            weekdays: reqWeekDays,
          };
          dispatch(createGroup(req));
        }
      },
    });

  useEffect(() => {
    dispatch(getUsers({ role: 2 }));
    // dispatch(getClassrooms());
    dispatch(getWeekdays());
  }, []);
  console.log(weekdays);
  return (
    <Stack width={"60%"} spacing={2} component={"form"} onSubmit={handleSubmit}>
      <h1>Создание группы</h1>
      <MyInput
        label="Введите название"
        fullWidth
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
      />
      <MySelect
        items={teachers}
        name="teacher"
        label={"Выберите учителя"}
        value={values.teacher}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={touched.teacher && Boolean(errors.teacher)}
        helperText={touched.teacher && errors.teacher}
      />
      <FormControl fullWidth>
        <InputLabel>Выберите дни недели</InputLabel>
        <Select
          multiple
          name="weekdays"
          value={values.weekdays}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.weekdays && Boolean(errors.weekdays)}
          renderValue={(selected) => selected.join(", ")}
        >
          {weekdays.map((option) => (
            <MenuItem key={option.value} value={option.text}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
        {touched.weekdays && Boolean(errors.weekdays) && (
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {errors.weekdays}
          </FormHelperText>
        )}
      </FormControl>
      <MyInput
        label="Введите цену курса"
        fullWidth
        name="price"
        value={values.price}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.price && Boolean(errors.price)}
        helperText={touched.price && errors.price}
      />
      <MySelect
        items={time}
        name="start_time"
        label={"Выберите время начала урока"}
        value={values.start_time}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={touched.start_time && Boolean(errors.start_time)}
        helperText={touched.start_time && errors.start_time}
      />
      <MySelect
        items={time}
        name="end_time"
        label={"Выберите время конца урока"}
        value={values.end_time}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={touched.end_time && Boolean(errors.end_time)}
        helperText={touched.end_time && errors.end_time}
      />
      <CardActions>
        <Button variant="contained" color="success" type="submit">
          Создать
        </Button>
      </CardActions>
    </Stack>
  );
}

export default GroupCreation;
