// // RBAC UI Implementation using React with Hooks and Functional Components

// // Install dependencies
// // npm install react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Modal,
//   Box,
//   TextField,
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import { getUsers, getRoles, createUser, updateUser, deleteUser } from "./dataService";

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

//   useEffect(() => {
//     const fetchData = async () => {
//       const users = await getUsers();
//       const roles = await getRoles();
//       setUsers(users);
//       setRoles(roles);
//     };
//     fetchData();
//   }, []);

//   const handleSave = async () => {
//     try {
//       let updatedUsers;
//       if (currentUser.id) {
//         await updateUser(currentUser);
//         updatedUsers = users.map((user) =>
//           user.id === currentUser.id ? currentUser : user
//         );
//         setNotification({ open: true, message: "User updated successfully!", severity: "success" });
//       } else {
//         const newUser = await createUser(currentUser);
//         updatedUsers = [...users, newUser];
//         setNotification({ open: true, message: "User added successfully!", severity: "success" });
//       }
//       setUsers(updatedUsers);
//       setModalOpen(false);
//     } catch (error) {
//       setNotification({ open: true, message: "Failed to save user!", severity: "error" });
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteUser(id);
//       const updatedUsers = users.filter((user) => user.id !== id);
//       setUsers(updatedUsers);
//       setNotification({ open: true, message: "User deleted successfully!", severity: "success" });
//     } catch (error) {
//       setNotification({ open: true, message: "Failed to delete user!", severity: "error" });
//     }
//   };

//   // const handleOpenModal = (user) => {
//   //   setCurrentUser(user || { name: "", role: roles[0]?.name || "", status: "Active" });
//   //   setModalOpen(true);
//   // };

//   const handleOpenModal = (user) => {
//     setCurrentUser(user || { 
//       name: "", 
//       role: roles.length > 0 ? roles[0].name : "", // Ensure role fallback
//       status: "Active" 
//     });
//     setModalOpen(true);
//   };
  

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Container>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             RBAC Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Typography variant="h4" sx={{ marginTop: 2 }}>
//         User Management
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ marginBottom: 2 }}
//         onClick={() => handleOpenModal(null)}
//       >
//         Add User
//       </Button>
//       <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.status}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     onClick={() => handleOpenModal(user)}
//                   >
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     color="secondary"
//                     onClick={() => handleDelete(user.id)}
//                   >
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography variant="h6">
//             {currentUser?.id ? "Edit" : "Add"} User
//           </Typography>
//           <TextField
//             label="Name"
//             fullWidth
//             margin="normal"
//             value={currentUser?.name || ""}
//             onChange={(e) =>
//               setCurrentUser((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />

// <TextField
//   label="Role"
//   select
//   SelectProps={{ native: true }}
//   fullWidth
//   margin="normal"
//   value={currentUser?.role || ""}
//   onChange={(e) =>
//     setCurrentUser((prev) => ({ ...prev, role: e.target.value }))
//   }
// >
//   {roles.length > 0 ? (
//     roles.map((role) => (
//       <option key={role.id} value={role.name}>
//         {role.name}
//       </option>
//     ))
//   ) : (
//     <option value="">No roles available</option>
//   )}
// </TextField>

//           <TextField
//             label="Status"
//             select
//             SelectProps={{ native: true }}
//             fullWidth
//             margin="normal"
//             value={currentUser?.status || "Active"}
//             onChange={(e) =>
//               setCurrentUser((prev) => ({ ...prev, status: e.target.value }))
//             }
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </TextField>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSave}
//             sx={{ marginTop: 2 }}
//           >
//             Save
//           </Button>
//         </Box>
//       </Modal>
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//           sx={{ width: "100%" }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//     </Routes>
//   </Router>
// );

// export default App;



// ---------------------------------------------------------------------------------------------

// RBAC UI Implementation using React with Hooks and Functional Components

// Install dependencies
// npm install react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material

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
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import { getUsers, getRoles, createUser, updateUser, deleteUser } from "./dataService";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ status: "", role: "" });
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      const roles = await getRoles();
      setUsers(users);
      setRoles(roles);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      let updatedUsers;
      if (currentUser.id) {
        await updateUser(currentUser);
        updatedUsers = users.map((user) =>
          user.id === currentUser.id ? currentUser : user
        );
        setNotification({ open: true, message: "User updated successfully!", severity: "success" });
      } else {
        const newUser = await createUser(currentUser);
        updatedUsers = [...users, newUser];
        setNotification({ open: true, message: "User added successfully!", severity: "success" });
      }
      setUsers(updatedUsers);
      setModalOpen(false);
    } catch (error) {
      setNotification({ open: true, message: "Failed to save user!", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setNotification({ open: true, message: "User deleted successfully!", severity: "success" });
    } catch (error) {
      setNotification({ open: true, message: "Failed to delete user!", severity: "error" });
    }
  };

  const handleOpenModal = (user) => {
    setCurrentUser(user || {
      name: "",
      role: roles[0]?.name || "",
      status: "Active",
      permissions: { read: true, write: false, update: false, delete: false },
      isAdmin: false,
    });
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
            placeholder="Search..."
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(null)}
        >
          Add User
        </Button>
        <div>
          <FormControl sx={{ marginRight: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filter.status}
              onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Role</InputLabel>
            <Select
              value={filter.role}
              onChange={(e) => setFilter((prev) => ({ ...prev, role: e.target.value }))}
            >
              <MenuItem value="">All</MenuItem>
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
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenModal(user)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Modal open={modalOpen} onClose={() => setModal */}

      <Modal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
>

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
          />
          <FormControl fullWidth margin="normal">
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
          <FormControl fullWidth margin="normal">
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


{/* // Claude result: -------------------------------------------------------------------------------------------------------------------------------- */}

{/* // import React, { useState, useEffect } from "react"; */}
{/* // import {  */}
//   AppBar, 
//   Toolbar, 
//   Typography, 
//   Button, 
//   Container, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper, 
//   Modal, 
//   Box, 
//   TextField, 
//   IconButton, 
//   Snackbar, 
//   Alert,
//   Checkbox,
//   FormControlLabel,
//   TableSortLabel
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { 
//   getUsers, 
//   getRoles, 
//   createUser, 
//   updateUser, 
//   deleteUser,
//   addRole 
// } from "./dataService";

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  
//   // Filtering and searching states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState({ status: "All", role: "All" });
//   const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
//   const [newRoleModalOpen, setNewRoleModalOpen] = useState(false);
//   const [newRoleName, setNewRoleName] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const fetchedUsers = await getUsers();
//       const fetchedRoles = await getRoles();
//       setUsers(fetchedUsers);
//       setRoles(fetchedRoles);
//     };
//     fetchData();
//   }, []);

//   const handleSave = async () => {
//     try {
//       let updatedUsers;
//       if (currentUser.id) {
//         await updateUser(currentUser);
//         updatedUsers = users.map((user) =>
//           user.id === currentUser.id ? currentUser : user
//         );
//         setNotification({ open: true, message: "User updated successfully!", severity: "success" });
//       } else {
//         const newUser = await createUser(currentUser);
//         updatedUsers = [...users, newUser];
//         setNotification({ open: true, message: "User added successfully!", severity: "success" });
//       }
//       setUsers(updatedUsers);
//       setModalOpen(false);
//     } catch (error) {
//       setNotification({ open: true, message: "Failed to save user!", severity: "error" });
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteUser(id);
//       const updatedUsers = users.filter((user) => user.id !== id);
//       setUsers(updatedUsers);
//       setNotification({ open: true, message: "User deleted successfully!", severity: "success" });
//     } catch (error) {
//       setNotification({ open: true, message: "Failed to delete user!", severity: "error" });
//     }
//   };

//   const handleOpenModal = (user) => {
//     setCurrentUser(user || { 
//       name: "", 
//       role: roles.length > 0 ? roles[0].name : "", 
//       status: "Active",
//       permissions: { read: false, write: false, update: false, delete: false }
//     });
//     setModalOpen(true);
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   const handleAddRole = async () => {
//     try {
//       const newRole = await addRole(newRoleName);
//       setRoles([...roles, newRole]);
//       setNewRoleModalOpen(false);
//       setNewRoleName("");
//       setNotification({ open: true, message: "Role added successfully!", severity: "success" });
//     } catch (error) {
//       setNotification({ open: true, message: "Failed to add role!", severity: "error" });
//     }
//   };

//   // Filtering and sorting functions
//   const filteredAndSortedUsers = users
//     .filter(user => 
//       (searchTerm === "" || 
//        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//        user.id.toString().includes(searchTerm)
//       ) &&
//       (filter.status === "All" || user.status === filter.status) &&
//       (filter.role === "All" || user.role === filter.role)
//     )
//     .sort((a, b) => {
//       if (sortConfig.key === "name") {
//         return sortConfig.direction === "asc" 
//           ? a.name.localeCompare(b.name) 
//           : b.name.localeCompare(a.name);
//       }
//       // Default sorting by id
//       return sortConfig.direction === "asc" 
//         ? a.id - b.id 
//         : b.id - a.id;
//     });

//   return (
//     <Container>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             RBAC Dashboard
//           </Typography>
//           <TextField
//             placeholder="Search Users..."
//             variant="standard"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ marginRight: 2, backgroundColor: 'white', padding: '0 10px', borderRadius: 1 }}
//           />
//         </Toolbar>
//       </AppBar>
      
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
//         <Typography variant="h4">User Management</Typography>
//         <Box>
//           <TextField
//             select
//             label="Status Filter"
//             SelectProps={{ native: true }}
//             value={filter.status}
//             onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
//             sx={{ marginRight: 2, width: 150 }}
//           >
//             <option value="All">All Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </TextField>
//           <TextField
//             select
//             label="Role Filter"
//             SelectProps={{ native: true }}
//             value={filter.role}
//             onChange={(e) => setFilter(prev => ({ ...prev, role: e.target.value }))}
//             sx={{ width: 150 }}
//           >
//             <option value="All">All Roles</option>
//             {roles.map(role => (
//               <option key={role.id} value={role.name}>{role.name}</option>
//             ))}
//           </TextField>
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, marginBottom: 2 }}>
//         <Box>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleOpenModal(null)}
//             startIcon={<Add />}
//           >
//             Add User
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => setNewRoleModalOpen(true)}
//             startIcon={<Add />}
//             sx={{ marginLeft: 2 }}
//           >
//             Add Role
//           </Button>
//         </Box>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortConfig.key === "id"}
//                   direction={sortConfig.direction}
//                   onClick={() => setSortConfig(prev => ({
//                     key: "id",
//                     direction: prev.direction === "asc" ? "desc" : "asc"
//                   }))}
//                 >
//                   ID
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortConfig.key === "name"}
//                   direction={sortConfig.direction}
//                   onClick={() => setSortConfig(prev => ({
//                     key: "name",
//                     direction: prev.direction === "asc" ? "desc" : "asc"
//                   }))}
//                 >
//                   Name
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Permissions</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredAndSortedUsers.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.status}</TableCell>
//                 <TableCell>
//                   {Object.entries(user.permissions).map(([key, value]) => (
//                     <div key={key}>{key}: {value ? 'Yes' : 'No'}</div>
//                   ))}
//                 </TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleOpenModal(user)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* User Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//         }}>
//           <Typography variant="h6">
//             {currentUser?.id ? "Edit" : "Add"} User
//           </Typography>
//           <TextField
//             label="Name"
//             fullWidth
//             margin="normal"
//             value={currentUser?.name || ""}
//             onChange={(e) =>
//               setCurrentUser((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />
//           <TextField
//             label="Role"
//             select
//             SelectProps={{ native: true }}
//             fullWidth
//             margin="normal"
//             value={currentUser?.role || ""}
//             onChange={(e) =>
//               setCurrentUser((prev) => ({ ...prev, role: e.target.value }))
//             }
//           >
//             {roles.length > 0 ? (
//               roles.map((role) => (
//                 <option key={role.id} value={role.name}>
//                   {role.name}
//                 </option>
//               ))
//             ) : (
//               <option value="">No roles available</option>
//             )}
//           </TextField>
//           <TextField
//             label="Status"
//             select
//             SelectProps={{ native: true }}
//             fullWidth
//             margin="normal"
//             value={currentUser?.status || "Active"}
//             onChange={(e) =>
//               setCurrentUser((prev) => ({ ...prev, status: e.target.value }))
//             }
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </TextField>
//           <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Permissions</Typography>
//           {["read", "write", "update", "delete"].map((permission) => (
//             <FormControlLabel
//               key={permission}
//               control={
//                 <Checkbox
//                   checked={currentUser?.permissions?.[permission] || false}
//                   onChange={(e) =>
//                     setCurrentUser((prev) => ({
//                       ...prev,
//                       permissions: {
//                         ...prev.permissions,
//                         [permission]: e.target.checked
//                       }
//                     }))
//                   }
//                 />
//               }
//               label={permission.charAt(0).toUpperCase() + permission.slice(1)}
//             />
//           ))}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSave}
//             sx={{ marginTop: 2 }}
//           >
//             Save
//           </Button>
//         </Box>
//       </Modal>

//       {/* New Role Modal */}
//       <Modal open={newRoleModalOpen} onClose={() => setNewRoleModalOpen(false)}>
//         <Box sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//         }}>
//           <Typography variant="h6">Add New Role</Typography>
//           <TextField
//             label="