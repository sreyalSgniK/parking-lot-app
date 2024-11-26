import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../css/manageBookings.css";

const ManageBookings = () => {
  const { id } = useParams(); // Parking lot ID from URL
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingsWithUserNames = async () => {
      try {
        // Fetch all bookings for the parking lot
        const bookingsResponse = await axios.get(
          `http://localhost:8080/bookings/parking-lot/${id}/bookings`
        );
        const bookingsData = bookingsResponse.data;

        // Fetch user names for each booking
        const bookingsWithUserNames = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const userResponse = await axios.get(
                `http://localhost:8080/accounts/${booking.userId}`
              );

              // Extract username from the user API response
              return {
                ...booking,
                userName: userResponse.data.username || "Unknown User",
              };
            } catch (error) {
              console.error(
                `Error fetching user data for userId ${booking.userId}:`,
                error
              );
              return { ...booking, userName: "Unknown User" };
            }
          })
        );

        setBookings(bookingsWithUserNames);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookingsWithUserNames();
  }, [id]);

  const handleBackToParkingLot = () => {
    navigate(`/owner/parking-lot/${id}`);
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
                <strong>User:</strong> {booking.userName}
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
