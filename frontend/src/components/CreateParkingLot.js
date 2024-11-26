import React, { useState } from "react";
import axios from "axios";
import { getUserFromCookie } from "./Profile";
import { useNavigate } from "react-router-dom"; // Add the navigate hook
import "./../css/createParkingLot.css"; // Import the CSS

const CreateParkingLot = () => {
  const [pname, setPname] = useState("");
  const [location, setLocation] = useState("");
  const [total, setTotal] = useState("");
  const [available, setAvailable] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState(""); // New state for the map embed URL
  const [error, setError] = useState("");

  const ownerId = getUserFromCookie().id;
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !pname ||
      !location ||
      !total ||
      !available ||
      !price ||
      !description ||
      !mapEmbedUrl
    ) {
      setError("Please provide all the details.");
      return;
    }

    axios
      .post("http://localhost:8080/parkinglots", {
        pname,
        location,
        total,
        available,
        price: parseFloat(price),
        description,
        mapEmbedUrl, // Include the map embed URL in the request body
        ownerId,
      })
      .then((response) => {
        window.location.href = "/dashboard/owner";
      })
      .catch((error) => {
        setError("Error creating parking lot, please try again.");
        console.error("Error creating parking lot:", error);
      });
  };

  const handleCancel = () => {
    // Navigate to dashboard or a relevant page
    navigate("/dashboard/owner");
  };

  return (
    <div className="create-parking-lot-form">
      <h2>Create New Parking Lot</h2>
      {error && <p className="error-message">{error}</p>}
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
        <div>
          <label>Map Embed URL:</label>
          <input
            type="text"
            value={mapEmbedUrl}
            onChange={(e) => setMapEmbedUrl(e.target.value)}
            required
            placeholder="Enter Google Map embed URL"
          />
        </div>
        <button type="submit">Create Parking Lot</button>
        <button type="button" onClick={handleCancel} className="btn-cancel">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateParkingLot;
