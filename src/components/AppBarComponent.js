// import React from "react";
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";

// const AppBarComponent = ({ setSelectedUser }) => (
//   <AppBar position="static">
//     <Toolbar>
//       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//         RBAC Dashboard
//       </Typography>
//       <Button color="inherit" onClick={() => setSelectedUser({})}>
//         Add User
//       </Button>
//     </Toolbar>
//   </AppBar>
// );

// export default AppBarComponent;




import React from "react";
import { AppBar, Toolbar, TextField } from "@mui/material";

const AppBarComponent = ({ onSearch }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <TextField
          placeholder="Search by Name or ID"
          variant="outlined"
          size="small"
          onChange={(e) => onSearch(e.target.value)}
          style={{ marginLeft: "auto" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
