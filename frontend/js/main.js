function handleLogin(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the selected user type
  const userType = document.querySelector(
    'input[name="userType"]:checked'
  ).value;

  // Redirect based on user type
  switch (userType) {
    case "user":
      window.location.href = "components/userDashboard.html";
      break;
    case "owner":
      window.location.href = "components/ownerDashboard.html";
      break;
    case "admin":
      window.location.href = "components/adminDashboard.html";
      break;
    default:
      alert("Please select a user type.");
  }
}
