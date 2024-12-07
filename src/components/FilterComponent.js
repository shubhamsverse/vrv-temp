// import React from "react";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// const FilterBar = ({ filter, setFilter, roles }) => {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//       <FormControl sx={{ marginRight: 2, minWidth: 90 }}>
//         <InputLabel>Status</InputLabel>
//         <Select
//           value={filter.status === "" ? "All" : filter.status}
//           onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value === "All" ? "" : e.target.value }))}
//         >
//           <MenuItem value="All">All</MenuItem>
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Inactive">Inactive</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl sx={{ minWidth: 80 }}>
//         <InputLabel>Role</InputLabel>
//         <Select
//           value={filter.role === "" ? "All" : filter.role}
//           onChange={(e) => setFilter((prev) => ({ ...prev, role: e.target.value === "All" ? "" : e.target.value }))}
//         >
//           <MenuItem value="All">All</MenuItem>
//           {roles.map((role) => (
//             <MenuItem key={role.id} value={role.name}>
//               {role.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default FilterBar;


// import React from "react";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// const FilterBar = ({ filter, setFilter, roles }) => {
//   return (
//     <div style={{ display: "flex", gap: "16px" }}>
//       {/* Status Filter */}
//       <FormControl sx={{ minWidth: 120 }}>
//         <InputLabel>Status</InputLabel>
//         <Select
//           value={filter.status || ""}
//           onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Inactive">Inactive</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Role Filter */}
//       <FormControl sx={{ minWidth: 120 }}>
//         <InputLabel>Role</InputLabel>
//         <Select
//           value={filter.role || ""}
//           onChange={(e) => setFilter((prev) => ({ ...prev, role: e.target.value }))}
//         >
//           <MenuItem value="">All</MenuItem>
//           {roles.map((role) => (
//             <MenuItem key={role.id} value={role.name}>
//               {role.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default FilterBar;

import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid, Button } from "@mui/material";

const FilterComponent = ({ roles, onFilter }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleFilter = () => {
    onFilter({ status: selectedStatus, role: selectedRole });
  };

  const handleClear = () => {
    setSelectedStatus("");
    setSelectedRole("");
    onFilter({ status: "", role: "" });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={5}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={5}>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          style={{ marginLeft: "8px" }}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
