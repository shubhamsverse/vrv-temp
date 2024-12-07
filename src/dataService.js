let users = [
  { 
    id: 1000000000000, 
    name: "Alice", 
    role: "Admin", 
    status: "Active", 
    permissions: { read: true, write: true, update: true, delete: true } 
  },
  { 
    id: 2000000000000, 
    name: "Bob", 
    role: "Software Developer", 
    status: "Inactive", 
    permissions: { read: true, write: true, update: false, delete: false } 
  },
];

let roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Normal User" },
  { id: 3, name: "Software Developer" },
  { id: 4, name: "HR" },
  { id: 5, name: "Finance" },
  { id: 6, name: "Marketing" },
  { id: 7, name: "Others" },
];

export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...users]), 500);
  });
};

export const getRoles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...roles]), 500);
  });
};

export const createUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = { 
        id: Date.now(), 
        ...user,
        permissions: user.permissions || { read: false, write: false, update: false, delete: false }
      };
      users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const updateUser = async (updatedUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      resolve(updatedUser);
    }, 500);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = users.filter((user) => user.id !== id);
      resolve();
    }, 500);
  });
};

// New function to add a dynamic role
export const addRole = async (roleName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRole = { id: Date.now(), name: roleName };
      roles.push(newRole);
      resolve(newRole);
    }, 500);
  });
};

//-------------------------------------------------------------------------------------

