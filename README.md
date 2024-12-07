# User Management Dashboard with Role-Based Access Control (RBAC)

## Project Overview

This project is a **User Management Dashboard** that simulates a role-based access control (RBAC) system. It allows users to manage, filter, and sort users with different roles and permissions. The dashboard is built using React and Material UI to provide a clean and modern interface. It includes features for adding, updating, and deleting users, along with the ability to filter users by status and role, and search by name or ID.

### Key Features:
- **User Management**: Add, update, and delete users.
- **Role Management**: Assign users different roles from a predefined list.
- **Permissions**: Assign permissions (read, write, update, delete) to users.
- **Search & Filter**: Search users by name or ID, and filter users by status and role.
- **Sorting**: Sort users by ID or name.

## Technologies Used:
- **React**: A JavaScript library for building user interfaces.
- **Material UI**: A popular React UI framework for fast and easy design.
- **JavaScript (ES6)**: For state management, API calls, and functionality.
- **React Router**: For routing between components.
- **Mock Data**: The app uses mock data for users and roles, simulating server-side API calls.

## Setup Instructions

### Prerequisites

Ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

### Steps to Run the Project Locally

1. **Clone the Repository**:
   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/<your-username>/user-management-dashboard.git

2. **Navigate to Project Folder**: 
   Change into the project directory**:

   ```bash
   cd user-management-dashboard

3. **Install Dependencies**: 
   Run the following command to install the necessary dependencies**:

   ```bash
   npm install


4. **Start the Development Server**: 
   After the dependencies are installed, start the development server**:

   ```bash
   npm start


This will launch the app in your browser, typically at http://localhost:3000.

How to Use
Dashboard
The dashboard displays the user data in a table with options to:
Add User: Open a modal to input a new user’s name, role, status, and permissions.
Edit User: Click the "Edit" icon in the actions column to modify a user’s details.
Delete User: Click the "Delete" icon to remove a user from the system.
Filtering & Sorting
Search: The search bar allows you to search for users by their name or ID.
Filter: You can filter users by their status (Active/Inactive) and role.
Sort: Click on the table headers (ID or Name) to sort users in ascending or descending order.
Permissions
Users have the following permissions: read, write, update, and delete.
Permissions can be assigned to users when adding or editing their details.
Add Role (Dynamic)
The backend (simulated by dataService.js) supports dynamically adding new roles. This functionality can be extended to allow role management.
Explanation of Code
1. App.js
This is the main entry point of the app where the dashboard is displayed. It contains all the logic for managing users, including adding, updating, deleting, searching, and sorting users. The modal window is used for adding or editing users. The Material UI components are used for the UI layout and styling.

useState: Manages the state for users, roles, and the current user.
useEffect: Fetches user and role data when the component is first loaded.
Sorting and Filtering: Implements logic to filter and sort users based on user input.
2. dataService.js
This file simulates the backend service. It handles the mock data for users and roles. The functions are asynchronous and simulate API calls with a delay using setTimeout.

getUsers(): Returns the list of users.
getRoles(): Returns the list of roles.
createUser(): Adds a new user to the users array.
updateUser(): Updates an existing user’s details.
deleteUser(): Deletes a user from the users array.
addRole(): Allows dynamically adding new roles.
Known Issues
Persistent Data: Data is lost when the app is reloaded since the data is only stored in memory and not in a database or local storage.
Role Editing: The role of an existing user cannot be changed after creation (though you can select roles when adding or editing users).
Future Enhancements
Implement user authentication and session management.
Add role management functionality to modify existing roles.
Implement backend integration with a real database to persist data.
License
This project is licensed under the MIT License.

