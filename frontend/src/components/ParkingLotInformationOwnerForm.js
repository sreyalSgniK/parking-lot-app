import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../css/ParkingLotInformationForm.css"; // Import custom CSS

const ParkingLotInformationOwnerForm = () => {
  const { id } = useParams(); // Get the parking lot ID from the URL
  const [parkingLot, setParkingLot] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch parking lot details from the backend
    axios
      .get(`http://localhost:8080/parkinglots/${id}`)
      .then((response) => {
        setParkingLot(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking lot details:", error);
      });
  }, [id]);

  const handleUpdateParkingLot = () => {
    // Redirect to the update parking lot page
    navigate(`/parking-lot/${id}/update`);
  };

  const handleManageReviews = () => {
    // Redirect to the manage reviews page
    navigate(`/parking-lot/${id}/reviews`);
  };

  const handleManageBookings = () => {
    // Redirect to the manage bookings page
    navigate(`/parking-lot/${id}/bookings`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard/owner");
  };

  if (!parkingLot) {
    return <p>Loading...</p>;
  }

  return (
    <div className="parking-lot-container">
      <div className="parking-lot-card">
        <h1>{parkingLot.pname}</h1>
        <p>
          <strong>Location:</strong> {parkingLot.location}
        </p>
        <p>
          <strong>Total Slots:</strong> {parkingLot.total}
        </p>
        <p>
          <strong>Available Slots:</strong> {parkingLot.available}
        </p>
        <p>
          <strong>Price Per Hour:</strong> {parkingLot.price} VND
        </p>
        <p>
          <strong>Description:</strong> {parkingLot.description}
        </p>

        <div className="button-group">
          <button onClick={handleUpdateParkingLot} className="btn-update">
            Update Parking Lot
          </button>
          <button onClick={handleManageReviews} className="btn-reviews">
            Manage Reviews
          </button>
          <button onClick={handleManageBookings} className="btn-bookings">
            Manage Bookings
          </button>
          <button onClick={handleBackToDashboard} className="btn-back">
            Back to Dashboard
          </button>
        </div>
        {/* Add Map */}
        <div className="map-container">
          <img
            src="/Hoa-Vu.png" // Replace with your map image path
            alt="Map"
            className="map-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ParkingLotInformationOwnerForm;
