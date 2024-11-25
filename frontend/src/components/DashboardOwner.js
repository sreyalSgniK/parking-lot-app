import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use this for navigation
import axios from "axios";
import { getUserFromCookie } from "./Profile";

const DashboardOwner = () => {
  // State to store parking lot data
  const [parkingLots, setParkingLots] = useState([]);

  // Get the logged-in owner's ID from localStorage
  const ownerId = getUserFromCookie().id; // Assuming user ID is saved here
  // console.log(ownerId);

  // Fetch parking lot data when the component mounts
  useEffect(() => {
    // Fetch all parking lot data from the backend
    axios
      .get(`http://localhost:8080/accounts/${ownerId}/parkinglots`)
      .then((response) => {
        // Filter parking lots to only show those belonging to the logged-in owner
        const ownerParkingLots = response.data.filter(
          (lot) => lot.ownerId === ownerId // Assuming 'ownerId' is the property for the owner ID
        );
        setParkingLots(ownerParkingLots); // Set filtered parking lots in state
        // console.log(ownerParkingLots);
      })
      .catch((error) => {
        console.error("Error fetching parking lots:", error);
      });
  }, [ownerId]); // Run the effect again if ownerId changes

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-left">
            <h2>Parking App</h2>
          </div>
          <div className="navbar-right">
            <Link to="/create-parking-lot">
              <button>Create New Parking Lot</button>
            </Link>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <h1>Welcome to the Owner Dashboard!</h1>

        <p>Here you can find and manage your parking lots.</p>

        {/* Parking Lots Grid */}
        <div className="parking-lots-grid">
          {parkingLots.length === 0 ? (
            <p>You have no parking lots available.</p>
          ) : (
            parkingLots.map((lot) => (
              <div key={lot.id} className="parking-lot-card">
                <h3>{lot.pname}</h3>
                <p>{lot.location}</p>
                <Link
                  to={`/owner/parking-lot/${lot.id}`}
                  className="view-details-link"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOwner;
