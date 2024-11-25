import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use this for navigation
import axios from "axios";

const DashboardUser = () => {
  // State to store parking lot data
  const [parkingLots, setParkingLots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch parking lot data when the component mounts
  useEffect(() => {
    // Fetch parking lot data from the backend
    axios
      .get("http://localhost:8080/parking-lots")
      .then((response) => {
        setParkingLots(response.data); // Set the parking lots in state
      })
      .catch((error) => {
        console.error("Error fetching parking lots:", error);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery) {
      axios
        .get(`http://localhost:8080/parking-lots/search?address=${searchQuery}`)
        .then((response) => {
          setParkingLots(response.data); // Update parking lots based on search
        })
        .catch((error) => {
          console.error("Error fetching parking lots:", error);
        });
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to login page (you can use react-router's useNavigate if needed)
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
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cầu Giấy, Hà Nội"
            />
            <button onClick={handleSearch}>Search</button>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <h1>Welcome to the User Dashboard!</h1>

        <p>
          Here you can find all available parking lots in the system or use the
          search bar to find nearby parking lots
        </p>

        {/* Parking Lots Grid */}
        <div className="parking-lots-grid">
          {parkingLots.length === 0 ? (
            <p>No parking lots available.</p>
          ) : (
            parkingLots.map((lot) => (
              <div key={lot.parkingLotId} className="parking-lot-card">
                <h3>{lot.name}</h3>
                <p>{lot.location}</p>
                <Link
                  to={`/parking-lot/${lot.parkingLotId}`}
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

export default DashboardUser;
