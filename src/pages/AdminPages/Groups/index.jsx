import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ModalComponent from "../../../components/Modal";
import { tokensLight } from "../../../providers/ThemeProvider";
import TabsComponent from "../../../components/Tabs";
import MainLayout from "../../../layouts/MainLayout";
import GroupCreation from "../../../components/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../../store/groups/groupsActions";
import GroupInfo from "../../../components/GroupInfo";
import GroupStudents from "../../../components/GroupStudents";
import Loader from "../../../components/Loader";

const GroupsListPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const groups = useSelector((s) => s.groups.groups);
  const getGroupsLoading = useSelector((s) => s.groups.getGroups.loading);
  const createGroupSuccess = useSelector((s) => s.groups.createGroup.success);

  const dispatch = useDispatch();

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openGroupModal = (group) => {
    setCurrentGroup(group);
    setIsInfoModalOpen(true);
  };

  const closeGroupInfoModal = () => {
    setCurrentGroup(null);
    setCurrentTab(0);
    setIsInfoModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const currentGroupComponent = useMemo(() => {
    if (currentTab === 0) {
      return <GroupInfo group={currentGroup} />;
    }
    return <GroupStudents group={currentGroup} />;
  }, [currentTab, currentGroup]);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  useEffect(() => {
    if (createGroupSuccess) {
      setIsCreateModalOpen(false);
    }
  }, [createGroupSuccess]);

  if (getGroupsLoading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <h1>Список групп</h1>

      <Button variant="contained" color="primary" onClick={openCreateModal}>
        Создать группу
      </Button>

      <ModalComponent
        isModalOpen={isCreateModalOpen}
        handleCloseModal={closeCreateModal}
      >
        <Card sx={{ width: "50%", background: tokensLight.primary[400] }}>
          <CardContent>
            <GroupCreation />
          </CardContent>
        </Card>
      </ModalComponent>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название группы</TableCell>
              <TableCell>Начало урока</TableCell>
              <TableCell>Конец урока</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group, index) => (
              <TableRow
                key={index}
                onClick={() => openGroupModal(group)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.start_time}</TableCell>
                <TableCell>{group.end_time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent
        isModalOpen={isInfoModalOpen}
        handleCloseModal={closeGroupInfoModal}
      >
        <Card
          sx={{
            width: "60%",
            background: tokensLight.primary[400],
          }}
        >
          <CardContent>
            <TabsComponent
              currentTab={currentTab}
              handleTabChange={handleTabChange}
              tabsContent={["Общая информация", "Студенты"]}
            />
            {currentGroupComponent}
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              onClick={closeGroupInfoModal}
            >
              Закрыть
            </Button>
          </CardActions>
        </Card>
      </ModalComponent>
    </MainLayout>
  );
};

export default GroupsListPage;
