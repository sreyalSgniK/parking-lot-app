import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../css/manageBookings.css"; // Import custom CSS

const ManageBookings = () => {
  const { id } = useParams(); // Get the parking lot ID from the URL
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all bookings for the parking lot by its ID
    axios
      .get(`http://localhost:8080/bookings/parking-lot/${id}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, [id]);

  const handleBackToParkingLot = () => {
    navigate(`/parking-lot/${id}`);
  };

  return (
    <div className="manage-bookings-container">
      <h1>Manage Bookings for Parking Lot</h1>
      <button className="btn-back" onClick={handleBackToParkingLot}>
        Back to Parking Lot
      </button>

      {bookings.length === 0 ? (
        <p>No bookings available for this parking lot.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.bid} className="booking-card">
              <p>
                <strong>Booking ID:</strong> {booking.bid}
              </p>
              <p>
                <strong>User:</strong> {booking.user.name}
              </p>
              <p>
                <strong>Start Time:</strong> {booking.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {booking.endTime}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
