import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { tokensLight } from "../../providers/ThemeProvider";
import MySelect from "../MySelect";
import MyInput from "../MyInput";
import { getGroupStudents, getGroups } from "../../store/groups/groupsActions";
import { useDispatch, useSelector } from "react-redux";
import { months } from "../../data/months";
import { createPayment } from "../../store/financials/financialsActions";

function CreatePayment() {
  const [paymentData, setPaymentData] = useState({
    group: "",
    student: "",
    payment_month: "",
    payment_sum: "",
  });
  const dispatch = useDispatch();

  const groups = useSelector((s) => s.groups.groups).map((g) => ({
    text: g.name,
    value: g.id,
  }));
  const groupStudents = useSelector((s) => s.groups.groupStudents).map((s) => ({
    text: s.surname + " " + s.name,
    value: s.id,
  }));

  const handleChangePaymentData = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleConfirmPayment = () => {
    // Выполните необходимые действия при подтверждении оплаты
    dispatch(createPayment(paymentData));
  };

  useEffect(() => {
    dispatch(getGroups());
  }, []);
  useEffect(() => {
    if (paymentData.group) {
      dispatch(getGroupStudents(paymentData.group));
    }
  }, [paymentData.group]);

  console.log(paymentData);
  return (
    <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
      <CardContent
        sx={{ width: "70%", display: "flex", flexWrap: "wrap", rowGap: "10px" }}
      >
        <Stack spacing={2} width={"100%"}>
          <Typography component={"h1"} variant="h3">
            Внесение оплаты
          </Typography>
          <MySelect
            handleChange={handleChangePaymentData}
            value={paymentData.group}
            name="group"
            items={groups}
            label={"Выберите курс"}
          />
          <MySelect
            disabled={!paymentData.group}
            handleChange={handleChangePaymentData}
            value={paymentData.student}
            items={groupStudents}
            name="student"
            label={"Выберите студента"}
          />
          <MySelect
            disabled={!paymentData.group || !paymentData.student}
            handleChange={handleChangePaymentData}
            value={paymentData.payment_month}
            items={months.map((m) => ({ text: m.name, value: m.id }))}
            label={"Выберите месяц"}
            name="payment_month"
          />
          <MyInput
            type="number"
            label="Сумма оплаты"
            id="payment-amount"
            disabled={
              !paymentData.group ||
              !paymentData.student ||
              !paymentData.payment_month
            }
            value={paymentData.payment_sum}
            onChange={handleChangePaymentData}
            fullWidth
            name="payment_sum"
            sx={{ marginBottom: "1rem" }}
          />

          <Button
            variant="contained"
            color="success"
            disabled={
              !paymentData.group ||
              !paymentData.payment_month ||
              !paymentData.payment_sum ||
              !paymentData.student
            }
            onClick={handleConfirmPayment}
          >
            Подтвердить оплату
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CreatePayment;
