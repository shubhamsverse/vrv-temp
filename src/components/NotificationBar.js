// import React from "react";
// import { Snackbar, Alert } from "@mui/material";

// const Notification = ({ notification, setNotification }) => {
//   const handleClose = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleClose}>
//       <Alert onClose={handleClose} severity={notification.severity} sx={{ width: "100%" }}>
//         {notification.message}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default Notification;
//////////////////////////////////////////////////////////////////


import React from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationBar = ({ notification, onClose }) => (
  <Snackbar
    open={notification.open}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert onClose={onClose} severity={notification.type}>
      {notification.message}
    </Alert>
  </Snackbar>
);

export default NotificationBar;
