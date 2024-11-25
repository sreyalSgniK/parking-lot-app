import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getUserFromCookie } from "./Profile"; // Assuming this gets user data

const CreateBookingForm = () => {
  const { id } = useParams(); // Retrieve parking lot ID from the URL
  const parkingLotId = parseInt(id, 10); // Convert to integer
  const [startTime, setStartTime] = useState(""); // Start time
  const [endTime, setEndTime] = useState(""); // End time
  const [error, setError] = useState(""); // Error state for form submission

  // Get the logged-in user's ID from cookie or localStorage
  const userId = getUserFromCookie().id; // Assuming user ID is saved in cookies or localStorage

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!startTime || !endTime) {
      setError("Please provide all the details.");
      return;
    }

    // Create booking data to send to backend
    const bookingData = {
      userId,
      pid: parkingLotId, // Use parkingLotId from URL
      startTime,
      endTime,
      status: "Pending", // Default status
    };

    // Submit the new booking to the backend
    axios
      .post("http://localhost:8080/bookings", bookingData)
      .then((response) => {
        // Redirect to a user dashboard or booking page after successful submission
        window.location.href = "/dashboard/user"; // Adjust redirection based on your app flow
      })
      .catch((error) => {
        setError("Error creating booking, please try again.");
        console.error("Error creating booking:", error);
      });
  };

  return (
    <div className="create-booking-form">
      <h2>Create New Booking</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export default CreateBookingForm;
