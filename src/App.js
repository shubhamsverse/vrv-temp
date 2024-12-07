import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import { getUsers, getRoles, createUser, updateUser, deleteUser } from "./dataService";

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
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSave = async () => {
    // Validate fields
    if (!currentUser.name || !currentUser.role || !currentUser.status) {
      setNotification({
        open: true,
        message: "All fields are mandatory!",
        severity: "error",
      });
      return;
    }

    const hasPermission = Object.values(currentUser.permissions).includes(true);
    if (!hasPermission) {
      setNotification({
        open: true,
        message: "At least one permission must be selected!",
        severity: "error",
      });
      return;
    }

    try {
      if (currentUser.id) {
        await updateUser(currentUser);
        setNotification({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });
      } else {
        await createUser(currentUser);
        setNotification({
          open: true,
          message: "User added successfully!",
          severity: "success",
        });
      }
      setModalOpen(false);
      fetchData(); // Re-fetch data to update the list
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to save user!",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setNotification({
        open: true,
        message: "User deleted successfully!",
        severity: "success",
      });
      fetchData(); // Re-fetch data to update the list
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to delete user!",
        severity: "error",
      });
    }
  };

  const handleOpenModal = (user) => {
    setCurrentUser(
      user || {
        name: "",
        role: roles[0]?.name || "",
        status: "Active",
        permissions: { read: false, write: false, update: false, delete: false },
      }
    );
    setModalOpen(true);
  };

  const handleSearch = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toString().includes(searchQuery)
    );
    return filteredUsers;
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedUsers = () => {
    return [...handleSearch()].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
    });
  };

  const filteredAndSortedUsers = sortedUsers().filter(
    (user) =>
      (!filter.status || user.status === filter.status) &&
      (!filter.role || user.role === filter.role)
  );

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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
            InputProps={{
              endAdornment: <Search />,
            }}
          />
        </Toolbar>
      </AppBar>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        User Management
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal(null)}>
          Add User
        </Button>
        <div>
          <FormControl sx={{ marginRight: 2, minWidth: 90 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filter.status === "" ? "All" : filter.status}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, status: e.target.value === "All" ? "" : e.target.value }))
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={filter.role === "" ? "All" : filter.role}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, role: e.target.value === "All" ? "" : e.target.value }))
              }
            >
              <MenuItem value="All">All</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("id")}>ID</TableCell>
              <TableCell onClick={() => handleSort("name")}>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  {Object.entries(user.permissions)
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
                    .join(", ")}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {currentUser?.id ? "Edit User" : "Add User"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={currentUser?.name || ""}
            onChange={(e) =>
              setCurrentUser((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              value={currentUser?.role || ""}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Permissions:
          </Typography>
          {["read", "write", "update", "delete"].map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={currentUser?.permissions[permission] || false}
                  onChange={(e) =>
                    setCurrentUser((prev) => ({
                      ...prev,
                      permissions: {
                        ...prev.permissions,
                        [permission]: e.target.checked,
                      },
                    }))
                  }
                />
              }
              label={permission.charAt(0).toUpperCase() + permission.slice(1)}
            />
          ))}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              value={currentUser?.status || ""}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            sx={{ marginTop: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
