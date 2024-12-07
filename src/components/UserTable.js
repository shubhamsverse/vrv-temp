// import React from "react";
// import { deleteUser } from "../dataService"; // Adjust the path if necessary

// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// const UserTable = ({ users, filter, searchQuery, setCurrentUser, setModalOpen, fetchData, setNotification }) => {
//   const filteredUsers = users.filter(user => 
//     user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (filter.status === "" || user.status === filter.status) &&
//     (filter.role === "" || user.role === filter.role)
//   );

//   const handleDelete = async (id) => {
//     try {
//       await deleteUser(id);
//       fetchData();
//       setNotification({ open: true, message: "User deleted!", severity: "success" });
//     } catch (error) {
//       setNotification({ open: true, message: "Failed to delete user!", severity: "error" });
//     }
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Role</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredUsers.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.id}</TableCell>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.role}</TableCell>
//               <TableCell>{user.status}</TableCell>
//               <TableCell>
//                 <IconButton onClick={() => setModalOpen(true)}>
//                   <Edit />
//                 </IconButton>
//                 <IconButton onClick={() => handleDelete(user.id)}>
//                   <Delete />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default UserTable;




/////////////////////////////////////////////////


// import React from "react";
// import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// const UserTable = ({ users, roles, onEdit, onDelete }) => (
//   <Table>
//     <TableHead>
//       <TableRow>
//         <TableCell>Name</TableCell>
//         <TableCell>Role</TableCell>
//         <TableCell>Status</TableCell>
//         <TableCell>Actions</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {users.map((user) => (
//         <TableRow key={user.id}>
//           <TableCell>{user.name}</TableCell>
//           <TableCell>{roles.find((role) => role.name === user.role)?.name || user.role}</TableCell>
//           <TableCell>{user.status}</TableCell>
//           <TableCell>
//             <IconButton onClick={() => onEdit(user)}>
//               <Edit />
//             </IconButton>
//             <IconButton onClick={() => onDelete(user.id)}>
//               <Delete />
//             </IconButton>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// );

// export default UserTable;



/////////////////////////////////////////////////////////////


// import React from "react";
// import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from "@mui/material";

// const UserTable = ({ users, roles, onEdit, onDelete, filters, setFilters }) => {
//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
//         <Select
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//         >
//           <MenuItem value="All">All Statuses</MenuItem>
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Inactive">Inactive</MenuItem>
//         </Select>
//         <Select
//           value={filters.role}
//           onChange={(e) => setFilters({ ...filters, role: e.target.value })}
//         >
//           <MenuItem value="All">All Roles</MenuItem>
//           {roles.map((role) => (
//             <MenuItem key={role.id} value={role.name}>
//               {role.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </div>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Role</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.id}</TableCell>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.role}</TableCell>
//               <TableCell>{user.status}</TableCell>
//               <TableCell>
//                 <button onClick={() => onEdit(user)}>Edit</button>
//                 <button onClick={() => onDelete(user.id)}>Delete</button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default UserTable;



import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const UserTable = ({ users, onEdit, onDelete }) => {
  const formatPermissions = (permissions) =>
    Object.entries(permissions)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(", ") || "None";

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Permissions</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{formatPermissions(user.permissions)}</TableCell>
            <TableCell>
              <Tooltip title="Edit">
                <IconButton onClick={() => onEdit(user)} color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => onDelete(user.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
