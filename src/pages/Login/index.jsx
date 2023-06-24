import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MyInput from "../../components/MyInput";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authActions";
import { useNavigate } from "react-router-dom";

const RootContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const FormContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
  width: "100%",
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius,
}));

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const LoginPage = () => {
  const authSuccess = useSelector((s) => s.auth.login.success);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Поле обязательно для заполнения")
      .email("Введите правильный формат почты"),
    password: Yup.string().required("Поле обязательно для заполнения"),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        dispatch(login(values));
        resetForm();
      },
    });

  useEffect(() => {
    if (authSuccess) {
      navigate("/");
    }
  }, [authSuccess]);

  return (
    <RootContainer>
      <FormContainer>
        <Typography variant="h5" align="center" color="white" gutterBottom>
          Войти в аккаунт
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction={"column"}>
            <Grid item xs={12}>
              <MyInput
                label="Почта"
                variant="outlined"
                fullWidth
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <MyInput
                label="Пароль"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <LoginButton
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Войти
              </LoginButton>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </RootContainer>
  );
};

export default LoginPage;
