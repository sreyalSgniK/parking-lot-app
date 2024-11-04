function authenticateUser(username, password) {
  // Mock API call - replace with actual API logic
  return new Promise((resolve, reject) => {
    const mockUser = {
      username,
      role: "user", // Change to 'owner' or 'admin' as needed
    };
    resolve(mockUser);
  });
}

function registerUser(userData) {
  // Mock API call - replace with actual API logic
  return Promise.resolve();
}
