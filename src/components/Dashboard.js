import React, { useState, useEffect } from "react";
// import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Container, Typography } from "@mui/material";
import { Container, AppBar, Toolbar, Typography, Button,TextField} from "@mui/material";
import { getUsers, getRoles } from "../dataService";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import Notification from "./Notification";
import FilterBar from "./FilterBar";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ status: "", role: "" });

  useEffect(() => {
    fetchData();
  }, []);

  // -----------------
  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getRoles();
      setRoles(rolesData);
    };

    fetchRoles();
  }, []);

  // -----------------

  const fetchData = async () => {
    try {
      const fetchedUsers = await getUsers();
      const fetchedRoles = await getRoles();
      setUsers(fetchedUsers);
      setRoles(fetchedRoles);
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to fetch data!",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RBAC Dashboard
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by Name or Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Toolbar>
      </AppBar>
      
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        User Management
      </Typography>


      {/* <FilterBar filter={filter} setFilter={setFilter} roles={roles} /> */}


      {/* --------------------------------- */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
        {/* Add User Button */}
        <Button variant="contained" color="primary">
          Add User
        </Button>
        {/* Filter Section */}
        <FilterBar filter={filter} setFilter={setFilter} roles={roles} />
      </div>
      {/* --------------------------------- */}
      <UserTable
        users={users}
        filter={filter}
        searchQuery={searchQuery}
        setCurrentUser={setCurrentUser}
        setModalOpen={setModalOpen}
        fetchData={fetchData}
        setNotification={setNotification}
      />

      <UserModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        roles={roles}
        fetchData={fetchData}
        setNotification={setNotification}
      />

      <Notification notification={notification} setNotification={setNotification} />
    </Container>
  );
};

export default Dashboard;
