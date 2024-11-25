import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../css/myBookings.css";
import { getUserFromCookie } from "./Profile"; // Helper to get logged-in user info

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [parkingLotNames, setParkingLotNames] = useState({});
  const userId = getUserFromCookie().id; // Get user ID from cookie/localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's bookings
    axios
      .get(`http://localhost:8080/bookings/user/${userId}`)
      .then((response) => {
        setBookings(response.data);

        // Fetch parking lot names for all bookings
        const parkingLotIds = [
          ...new Set(response.data.map((booking) => booking.pid)),
        ];
        parkingLotIds.forEach((pid) => {
          axios
            .get(`http://localhost:8080/parkinglots/${pid}`)
            .then((res) => {
              setParkingLotNames((prev) => ({
                ...prev,
                [pid]: res.data.pname, // Map PID to parking lot name
              }));
            })
            .catch((err) =>
              console.error(`Error fetching parking lot ${pid}:`, err)
            );
        });
      })
      .catch((error) => {
        console.error("Error fetching user bookings:", error);
      });
  }, [userId]);

  const handleBackToDashboard = () => {
    navigate("/dashboard/user");
  };

  const handleCancelBooking = (bookingId) => {
    axios
      .put(`http://localhost:8080/bookings/${bookingId}/cancel`)
      .then((response) => {
        // Update the booking status in the state after cancellation
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.bid === bookingId
              ? { ...booking, status: "Cancelled" }
              : booking
          )
        );
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
      });
  };

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      <button className="back-button" onClick={handleBackToDashboard}>
        Back to Dashboard
      </button>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.bid} className="booking-card">
              <p>
                <strong>Parking Lot:</strong>{" "}
                {parkingLotNames[booking.pid] || "Loading..."}
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
              {booking.status !== "Cancelled" && (
                <button
                  className="cancel-booking-button"
                  onClick={() => handleCancelBooking(booking.bid)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
