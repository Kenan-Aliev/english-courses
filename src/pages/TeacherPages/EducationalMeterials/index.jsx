import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import MainLayout from "../../../layouts/MainLayout";
import ModalComponent from "../../../components/Modal";
import { tokensLight } from "../../../providers/ThemeProvider";
import MyInput from "../../../components/MyInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createMaterial,
  getGroupMaterials,
  getGroups,
} from "../../../store/groups/groupsActions";
import Loader from "../../../components/Loader";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Поле 'Название' обязательно для заполнения"),
  file: Yup.mixed().required("Необходимо выбрать файл"),
});

const EducationalMaterials = () => {
  const [materialsModalOpen, setMaterialsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const user = useSelector((s) => s.auth.user);
  const courses = useSelector((s) => s.groups.groups);
  const groupMaterials = useSelector((s) => s.groups.groupMaterials);
  const getGroupsLoading = useSelector((s) => s.groups.getGroups.loading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("file", values.file);
      formdata.append("group", selectedCourse.id);
      dispatch(createMaterial(formdata));
      closeMaterialsModal();
    },
  });

  const openMaterialsModal = (course) => {
    setSelectedCourse(course);
    setMaterialsModalOpen(true);
  };

  const closeMaterialsModal = () => {
    setSelectedCourse(null);
    setMaterialsModalOpen(false);
    formik.resetForm();
  };

  const openInfoModal = (course) => {
    setSelectedCourse(course);
    setInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  useEffect(() => {
    dispatch(getGroups({ teacher: user.id }));
  }, []);

  useEffect(() => {
    if (infoModalOpen) {
      dispatch(getGroupMaterials({ group_id: selectedCourse?.id }));
    }
  }, [infoModalOpen, selectedCourse]);

  if (getGroupsLoading) {
    return <Loader />;
  }
  return (
    <MainLayout>
      <Typography variant="h2" component="h1" align="left" gutterBottom>
        Учебные материалы
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow
                key={course.id}
                onClick={() => openInfoModal(course)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{course.name}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      openMaterialsModal(course);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Добавить материалы
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent
        isModalOpen={materialsModalOpen}
        handleCloseModal={closeMaterialsModal}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Добавить материалы
            </Typography>
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <MyInput
                label="Название"
                fullWidth
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                type="file"
                fullWidth
                name="file"
                onChange={(e) => {
                  formik.setFieldValue("file", e.target.files[0]);
                }}
                error={formik.touched.file && formik.errors.file}
                helperText={formik.touched.file && formik.errors.file}
              />
              <CardActions>
                <Button type="submit" variant="contained" color="success">
                  Добавить
                </Button>
                <Button
                  onClick={closeMaterialsModal}
                  color="error"
                  variant="outlined"
                >
                  Отмена
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </ModalComponent>

      <ModalComponent
        isModalOpen={infoModalOpen}
        handleCloseModal={closeInfoModal}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Учебные материалы
            </Typography>
            <TableContainer>
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
                        <a href={material.file} target="_blank" download>
                          Открыть
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </ModalComponent>
    </MainLayout>
  );
};

export default EducationalMaterials;
