import React, { useState } from "react";
import axios from "axios";
import { getUserFromCookie } from "./Profile";

const CreateParkingLot = () => {
  const [pname, setPname] = useState(""); // Parking lot name
  const [location, setLocation] = useState(""); // Parking lot location
  const [total, setTotal] = useState(""); // Total slots
  const [available, setAvailable] = useState(""); // Available slots
  const [price, setPrice] = useState(""); // Price per hour
  const [description, setDescription] = useState(""); // Description
  const [error, setError] = useState(""); // Error state for form submission

  // Get the logged-in owner's ID from localStorage
  const ownerId = getUserFromCookie().id; // Assuming user ID is saved in localStorage
  //   console.log(ownerId);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!pname || !location || !total || !available || !price || !description) {
      setError("Please provide all the details.");
      return;
    }

    // Submit the new parking lot to the backend
    axios
      .post("http://localhost:8080/parkinglots", {
        pname,
        location,
        total,
        available,
        price: parseFloat(price), // Convert price to a number
        description,
        ownerId, // Attach the ownerId
      })
      .then((response) => {
        // Redirect to the owner dashboard after successful submission
        window.location.href = "/dashboard/owner";
      })
      .catch((error) => {
        setError("Error creating parking lot, please try again.");
        console.error("Error creating parking lot:", error);
      });
  };

  return (
    <div className="create-parking-lot-form">
      <h2>Create New Parking Lot</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Parking Lot Name:</label>
          <input
            type="text"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            required
            placeholder="Enter parking lot name"
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Enter parking lot location"
          />
        </div>
        <div>
          <label>Total Slots:</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
            placeholder="Enter total number of slots"
          />
        </div>
        <div>
          <label>Available Slots:</label>
          <input
            type="number"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            required
            placeholder="Enter number of available slots"
          />
        </div>
        <div>
          <label>Price Per Hour:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price per hour"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter parking lot description"
          ></textarea>
        </div>
        <button type="submit">Create Parking Lot</button>
      </form>
    </div>
  );
};

export default CreateParkingLot;
