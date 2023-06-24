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
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../../store/groups/groupsActions";
import Loader from "../../../components/Loader";
import { getGroupPayment } from "../../../store/financials/financialsActions";

// Компонент страницы оплаты
function PaymentPage() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [openModal, setModalOpen] = useState(false);

  const groups = useSelector((s) => s.groups.groups);
  const getGroupsLoading = useSelector((s) => s.groups.getGroups.loading);
  const groupPayment = useSelector((s) => s.financials.groupPayment);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  useEffect(() => {
    if (activeCourse) {
      dispatch(getGroupPayment({ group_id: activeCourse.id }));
    }
  }, [activeCourse]);

  if (getGroupsLoading) {
    return <Loader />;
  }
  return (
    <MainLayout>
      <h1>Страница оплаты</h1>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Название группы</b>
            </TableCell>
            <TableCell>
              <b>Стоимость курса</b>
            </TableCell>
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
                <TableCell>
                  <b>Студент</b>
                </TableCell>
                <TableCell>
                  <b>Месяц</b>
                </TableCell>
                <TableCell>
                  <b>Сумма оплаты</b>
                </TableCell>
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
    </MainLayout>
  );
}

export default PaymentPage;
