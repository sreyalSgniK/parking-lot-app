function login(event) {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;

  authenticateUser(username, password)
    .then((user) => {
      loadDashboard(user.role);
    })
    .catch((error) => {
      alert("Login failed. Please check your credentials.");
    });
}

function register(event) {
  event.preventDefault();
  const userData = {
    username: event.target.username.value,
    password: event.target.password.value,
    role: event.target.role.value,
  };

  registerUser(userData)
    .then(() => {
      alert("Registration successful! Please log in.");
      loadComponent("content", "components/loginForm.html");
    })
    .catch((error) => {
      alert("Registration failed. Please try again.");
    });
}
