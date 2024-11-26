import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For React Router v6
import Cookies from "js-cookie";
import "./../css/ProfilePage.css"; // Import your styles

// Get user profile from cookies
export const getUserFromCookie = () => {
  const userProfile = Cookies.get("userProfile");
  // console.log(userProfile.role);
  return userProfile ? JSON.parse(userProfile) : null;
};

const Profile = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const userProfile = getUserFromCookie();
    // console.log(userProfile.role);
    if (userProfile) {
      setAccount(userProfile);
    } else {
      window.location.href = "/login"; // Redirect if not logged in
    }
  }, []);

  if (!account) {
    return <div className="loading">Loading...</div>;
  }

  // Navigate to the dashboard based on the user's role
  const handleGoBackToDashboard = () => {
    // Navigate to different dashboard paths based on user role
    if (account.role === "OWNER") {
      navigate("/dashboard/owner");
    } else if (account.role === "USER") {
      navigate("/dashboard/user");
    } else if (account.role === "ADMIN") {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard"); // Default path if role is undefined or unrecognized
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p>
          <strong>Username:</strong> {account.username}
        </p>
        <p>
          <strong>Email:</strong> {account.email}
        </p>
        <p>
          <strong>Phone:</strong> {account.phone}
        </p>
        <p>
          <strong>Role:</strong> {account.role}
        </p>
      </div>

      {/* Button to go back to dashboard based on user role */}
      <button className="go-back-btn" onClick={handleGoBackToDashboard}>
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;
