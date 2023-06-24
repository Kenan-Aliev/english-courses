import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
} from "@mui/material";
import MainLayout from "../../../layouts/MainLayout";
import ModalComponent from "../../../components/Modal";
import { tokensLight } from "../../../providers/ThemeProvider";
import CreatePayment from "../../../components/CreatePayment";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../../store/groups/groupsActions";
import Loader from "../../../components/Loader";
import { getGroupPayment } from "../../../store/financials/financialsActions";

// Компонент страницы оплаты
function PaymentPage() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [openCreatePaymentModal, setOpenCreatePaymentModal] = useState(false);

  const groups = useSelector((s) => s.groups.groups);
  const groupPayment = useSelector((s) => s.financials.groupPayment);
  const createPaymentSuccess = useSelector(
    (s) => s.financials.createPayment.success
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (createPaymentSuccess) {
      setOpenCreatePaymentModal(false);
    }
  }, [createPaymentSuccess]);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  useEffect(() => {
    if (activeCourse) {
      dispatch(getGroupPayment({ group_id: activeCourse.id }));
    }
  }, [activeCourse]);
  return (
    <MainLayout>
      <h1>Страница оплаты</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreatePaymentModal(true)}
      >
        Внести оплату
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название группы</TableCell>
            <TableCell>Стоимость курса</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((course) => (
            <TableRow
              key={course.id}
              onClick={() => {
                setActiveCourse(course);
                setModalOpen(true);
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalComponent
        isModalOpen={openModal}
        handleCloseModal={() => setModalOpen(false)}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Студент</TableCell>
                <TableCell>Месяц</TableCell>
                <TableCell>Сумма оплаты</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupPayment.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {payment.student?.surname} {payment.student?.name}
                  </TableCell>
                  <TableCell>{payment.payment_month?.name}</TableCell>
                  <TableCell>{payment.payment_sum} сом</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </ModalComponent>

      <ModalComponent
        isModalOpen={openCreatePaymentModal}
        handleCloseModal={() => setOpenCreatePaymentModal(false)}
      >
        <CreatePayment />
      </ModalComponent>
    </MainLayout>
  );
}

export default PaymentPage;
