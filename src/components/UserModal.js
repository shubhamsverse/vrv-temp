// import React from "react";
// import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Typography } from "@mui/material";

// const UserModal = ({
//   modalOpen,
//   setModalOpen,
//   currentUser,
//   setCurrentUser,
//   roles,
//   fetchData,
//   setNotification
// }) => {
//   const handleSave = async () => {
//     // Handle save logic
//   };

//   return (
//     <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//       <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           {currentUser?.id ? "Edit User" : "Add User"}
//         </Typography>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Name"
//           value={currentUser?.name || ""}
//           onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Role</InputLabel>
//           <Select
//             value={currentUser?.role || ""}
//             onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
//           >
//             {roles.map((role) => (
//               <MenuItem key={role.id} value={role.name}>
//                 {role.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         {/* Add Permissions */}
//         <Button onClick={handleSave}>Save</Button>
//       </Box>
//     </Modal>
//   );
// };

// export default UserModal;


/////////////////////////////////////


// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   InputLabel,
//   FormControl,
// } from "@mui/material";

// const UserModal = ({ roles, selectedUser, onClose, onSave, onAddRole }) => {
//   const [user, setUser] = useState({ name: "", role: "", status: "Active" });
//   const [newRole, setNewRole] = useState("");

//   useEffect(() => {
//     if (selectedUser) {
//       setUser(selectedUser);
//     }
//   }, [selectedUser]);

//   const handleSave = () => {
//     onSave(user);
//     onClose();
//   };

//   const handleAddRole = () => {
//     if (newRole) {
//       onAddRole(newRole);
//       setNewRole("");
//     }
//   };

//   return (
//     <Dialog open={!!selectedUser} onClose={onClose}>
//       <DialogTitle>{user?.id ? "Edit User" : "Add User"}</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Name"
//           fullWidth
//           value={user.name}
//           onChange={(e) => setUser({ ...user, name: e.target.value })}
//           margin="dense"
//         />
//         <FormControl fullWidth margin="dense">
//           <InputLabel>Role</InputLabel>
//           <Select
//             value={user.role}
//             onChange={(e) => setUser({ ...user, role: e.target.value })}
//           >
//             {roles.map((role) => (
//               <MenuItem key={role.id} value={role.name}>
//                 {role.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button onClick={handleAddRole}>Add New Role</Button>
//         <TextField
//           label="New Role"
//           fullWidth
//           value={newRole}
//           onChange={(e) => setNewRole(e.target.value)}
//           margin="dense"
//         />
//         <FormControl fullWidth margin="dense">
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={user.status}
//             onChange={(e) => setUser({ ...user, status: e.target.value })}
//           >
//             <MenuItem value="Active">Active</MenuItem>
//             <MenuItem value="Inactive">Inactive</MenuItem>
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSave} color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UserModal;



///////////////////////////////////////////////////////


// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
//   Button,
// } from "@mui/material";

// const UserModal = ({ roles, selectedUser, onClose, onSave }) => {
//   const [userData, setUserData] = useState({
//     name: "",
//     role: "",
//     status: "Active",
//     permissions: { read: false, write: false, update: false, delete: false },
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (selectedUser) {
//       setUserData(selectedUser);
//     } else {
//       setUserData({
//         name: "",
//         role: "",
//         status: "Active",
//         permissions: { read: false, write: false, update: false, delete: false },
//       });
//     }
//   }, [selectedUser]);

//   const validate = () => {
//     const newErrors = {};
//     if (!userData.name.trim()) newErrors.name = "Name is required.";
//     if (!userData.role) newErrors.role = "Role is required.";
//     if (!Object.values(userData.permissions).some((value) => value))
//       newErrors.permissions = "At least one permission must be selected.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePermissionChange = (permission) => {
//     setUserData((prev) => ({
//       ...prev,
//       permissions: { ...prev.permissions, [permission]: !prev.permissions[permission] },
//     }));
//   };

//   const handleSave = () => {
//     if (!validate()) return;
//     onSave(userData);
//     onClose();
//   };

//   return (
//     <Dialog open={!!selectedUser} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>{selectedUser?.id ? "Edit User" : "Add New User"}</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Name"
//           name="name"
//           value={userData.name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           error={!!errors.name}
//           helperText={errors.name}
//         />
//         <Select
//           label="Role"
//           name="role"
//           value={userData.role}
//           onChange={handleChange}
//           fullWidth
//           displayEmpty
//           error={!!errors.role}
//         >
//           <MenuItem value="" disabled>
//             Select a Role
//           </MenuItem>
//           {roles.map((role) => (
//             <MenuItem key={role.id} value={role.name}>
//               {role.name}
//             </MenuItem>
//           ))}
//         </Select>
//         {errors.role && <div style={{ color: "red", fontSize: "0.8em" }}>{errors.role}</div>}
//         <Select
//           label="Status"
//           name="status"
//           value={userData.status}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         >
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Inactive">Inactive</MenuItem>
//         </Select>
//         <div style={{ marginTop: "15px" }}>
//           <div>Permissions:</div>
//           {["read", "write", "update", "delete"].map((permission) => (
//             <FormControlLabel
//               key={permission}
//               control={
//                 <Checkbox
//                   checked={userData.permissions[permission]}
//                   onChange={() => handlePermissionChange(permission)}
//                 />
//               }
//               label={permission.charAt(0).toUpperCase() + permission.slice(1)}
//             />
//           ))}
//           {errors.permissions && <div style={{ color: "red", fontSize: "0.8em" }}>{errors.permissions}</div>}
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSave} color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UserModal;


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Grid,
} from "@mui/material";

const UserModal = ({ roles, selectedUser, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    status: "Active",
    permissions: { read: false, write: false, update: false, delete: false },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setUserData(selectedUser);
    } else {
      setUserData({
        name: "",
        role: "",
        status: "Active",
        permissions: { read: false, write: false, update: false, delete: false },
      });
    }
  }, [selectedUser]);

  const validate = () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = "Name is required.";
    if (!userData.role) newErrors.role = "Role is required.";
    if (!Object.values(userData.permissions).some((value) => value))
      newErrors.permissions = "At least one permission must be selected.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setUserData((prev) => ({
      ...prev,
      permissions: { ...prev.permissions, [permission]: !prev.permissions[permission] },
    }));
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(userData);
    onClose();
  };

  return (
    <Dialog open={!!selectedUser} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{selectedUser?.id ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={userData.status}
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div>Permissions:</div>
            <FormGroup row>
              {["read", "write", "update", "delete"].map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      checked={userData.permissions[permission]}
                      onChange={() => handlePermissionChange(permission)}
                    />
                  }
                  label={permission.charAt(0).toUpperCase() + permission.slice(1)}
                />
              ))}
            </FormGroup>
            {errors.permissions && (
              <div style={{ color: "red", fontSize: "0.8em" }}>{errors.permissions}</div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
