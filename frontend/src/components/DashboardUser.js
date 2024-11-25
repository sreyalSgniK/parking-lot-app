import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use this for navigation
import axios from "axios";

const DashboardUser = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch parking lot data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/parkinglots")
      .then((response) => {
        setParkingLots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking lots:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery) {
      axios
        .get(`http://localhost:8080/parking-lots/search?address=${searchQuery}`)
        .then((response) => {
          setParkingLots(response.data);
        })
        .catch((error) => {
          console.error("Error fetching parking lots:", error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
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
            <Link to="/my-bookings">
              <button>My Bookings</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <h1>Welcome to the User Dashboard!</h1>

        <p>
          Here you can find all available parking lots in the system or use the
          search bar to find nearby parking lots.
        </p>

        <div className="parking-lots-grid">
          {parkingLots.length === 0 ? (
            <p>No parking lots available.</p>
          ) : (
            parkingLots.map((lot) => (
              <div key={lot.id} className="parking-lot-card">
                <h3>{lot.pname}</h3>
                <p>{lot.location}</p>
                <Link
                  to={`/parking-lot/${lot.id}`}
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
