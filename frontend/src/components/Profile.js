import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";

// Get user profile from cookies
export const getUserFromCookie = () => {
  const userProfile = Cookies.get("userProfile");
  return userProfile ? JSON.parse(userProfile) : null;
};

const Profile = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const userProfile = getUserFromCookie();
    if (userProfile) {
      setAccount(userProfile);
    } else {
      window.location.href = "/login"; // Redirect if not logged in
    }
  }, []);

  if (!account) {
    return <div>Loading...</div>;
  }

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
    </div>
  );
};

export default Profile;
