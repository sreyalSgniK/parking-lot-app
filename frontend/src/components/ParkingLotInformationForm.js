import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../css/ParkingLotInformationForm.css"; // Import custom CSS

const ParkingLotInformationForm = () => {
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

  const handleBookSlot = () => {
    navigate(`/parking-lot/${id}/book`);
  };

  const handleLeaveReview = () => {
    navigate(`/parking-lot/${id}/review`);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard/user");
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
          <button onClick={handleBookSlot} className="btn-book">
            Book a Slot
          </button>
          <button onClick={handleLeaveReview} className="btn-review">
            Leave a Review
          </button>
          <button onClick={handleBackToDashboard} className="btn-back">
            Back to Dashboard
          </button>
        </div>

        {/* Embed Google Map */}
        <div className="map-container">
          <iframe
            src={parkingLot.mapEmbedUrl} // Dynamically insert the map URL
            width="300"
            height="225"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ParkingLotInformationForm;
